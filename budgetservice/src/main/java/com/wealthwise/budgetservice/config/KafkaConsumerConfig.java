package com.wealthwise.budgetservice.config;

import com.wealthwise.budgetservice.dto.Budgetdto;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.*;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConsumerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    /**
     * Listener factory for TransactionDTO.
     */
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Budgetdto> transactionListenerFactory() {
        Map<String, Object> props = commonProps();

        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                ErrorHandlingDeserializer.class);
        props.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS,
                JsonDeserializer.class.getName());

        JsonDeserializer<Budgetdto> deserializer =
                new JsonDeserializer<>(Budgetdto.class)          // :contentReference[oaicite:2]{index=2}
                        .trustedPackages("com.spendingservice.wealthwise.dto")
                        .ignoreTypeHeaders();                             // :contentReference[oaicite:3]{index=3}

        DefaultKafkaConsumerFactory<String, Budgetdto> cf =
                new DefaultKafkaConsumerFactory<>(props,
                        new StringDeserializer(),
                        deserializer);

        ConcurrentKafkaListenerContainerFactory<String, Budgetdto> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(cf);
        return factory;
    }

    /** Shared consumer properties. */
    private Map<String, Object> commonProps() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "budget-group");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        return props;
    }
}