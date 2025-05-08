package com.spendingservice.wealthwise.kafka;

import com.spendingservice.wealthwise.dto.TransactionDTO;
import com.spendingservice.wealthwise.dto.UserSpendingDTO;
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
     * Listener factory for UserSpendingDTO.
     * We instantiate JsonDeserializer with the target class.
     */
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, UserSpendingDTO> userSpendingListenerFactory() {
        // Common consumer props
        Map<String, Object> props = commonProps();

        // Use ErrorHandlingDeserializer to wrap the delegate
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                ErrorHandlingDeserializer.class);
        // Delegate to JsonDeserializer<UserSpendingDTO>
        props.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS,
                JsonDeserializer.class.getName());

        // Construct the deserializer with the target type
        JsonDeserializer<UserSpendingDTO> deserializer =
                new JsonDeserializer<>(UserSpendingDTO.class)        // :contentReference[oaicite:0]{index=0}
                        .trustedPackages("com.spendingservice.wealthwise.dto")
                        .ignoreTypeHeaders();                             // :contentReference[oaicite:1]{index=1}

        DefaultKafkaConsumerFactory<String, UserSpendingDTO> cf =
                new DefaultKafkaConsumerFactory<>(props,
                        new StringDeserializer(),
                        deserializer);

        ConcurrentKafkaListenerContainerFactory<String, UserSpendingDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(cf);
        return factory;
    }

    /**
     * Listener factory for TransactionDTO.
     */
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, TransactionDTO> transactionListenerFactory() {
        Map<String, Object> props = commonProps();

        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                ErrorHandlingDeserializer.class);
        props.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS,
                JsonDeserializer.class.getName());

        JsonDeserializer<TransactionDTO> deserializer =
                new JsonDeserializer<>(TransactionDTO.class)          // :contentReference[oaicite:2]{index=2}
                        .trustedPackages("com.spendingservice.wealthwise.dto")
                        .ignoreTypeHeaders();                             // :contentReference[oaicite:3]{index=3}

        DefaultKafkaConsumerFactory<String, TransactionDTO> cf =
                new DefaultKafkaConsumerFactory<>(props,
                        new StringDeserializer(),
                        deserializer);

        ConcurrentKafkaListenerContainerFactory<String, TransactionDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(cf);
        return factory;
    }

    /** Shared consumer properties. */
    private Map<String, Object> commonProps() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "spending-group");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        return props;
    }
}
