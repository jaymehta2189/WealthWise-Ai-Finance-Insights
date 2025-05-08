package com.spendingservice.wealthwise.stream;

import com.spendingservice.wealthwise.model.CategoricalSpend;
import com.spendingservice.wealthwise.repository.CategoricalSpendRepository;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.kstream.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.support.serializer.JsonSerde;
import org.apache.kafka.streams.StreamsBuilder;

import java.time.Duration;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class SpendStreamProcessor {

    public record TransactionEvent(
            String userId,
            String category,
            String type,
            double amount,
            java.time.LocalDateTime timestamp) {}


    @Bean
    public KStream<String, TransactionEvent> process(StreamsBuilder builder,
                                                     CategoricalSpendRepository repo) {
        var txSerde = new JsonSerde<>(TransactionEvent.class);

        KStream<String, TransactionEvent> txs = builder.stream(
                "user-transaction-topic",
                Consumed.with(Serdes.String(), txSerde)
        );

        txs.filter((k, v) -> "DEBIT".equalsIgnoreCase(v.type()))
                .groupBy((k, v) -> v.userId() + "|" + v.category() + "|" + YearMonth.from(v.timestamp()),
                        Grouped.with(Serdes.String(), txSerde))
                .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofDays(30)))
                .aggregate(
                        () -> 0.0,
                        (aggKey, tx, sum) -> sum + tx.amount(),
                        Materialized.with(Serdes.String(), Serdes.Double())
                )
                .toStream()
                .foreach((windowedKey, total) -> {
                    var parts = windowedKey.key().split("\\|");
                    String userId = parts[0];
                    String category = parts[1];
                    YearMonth period = YearMonth.parse(parts[2]);

                    String summaryId = userId + ":" + period;
                    CategoricalSpend summary = repo.findById(summaryId)
                            .orElse(CategoricalSpend.builder()
                                    .id(summaryId)
                                    .userId(userId)
                                    .period(period)
                                    .byCategory(new HashMap<>())
                                    .build());

                    summary.getByCategory().put(category, total);
                    double totalExpense = summary.getByCategory().values()
                            .stream().mapToDouble(Double::doubleValue).sum();
                    summary.setTotalExpense(totalExpense);
                    // TODO: set totalIncome & netSavings

                    repo.save(summary);
                });

        return txs;
    }
}