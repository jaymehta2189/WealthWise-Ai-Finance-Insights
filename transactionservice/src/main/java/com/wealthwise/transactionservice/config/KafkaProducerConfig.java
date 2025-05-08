package com.wealthwise.transactionservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wealthwise.transactionservice.dto.Transactiondto;
import com.wealthwise.transactionservice.model.Transaction;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

    @Autowired
    private ObjectMapper kafkaObjectMapper;

    @Bean
    public ProducerFactory<String, Transactiondto> producerFactory() {
        Map<String, Object> props = new HashMap<>();
        // Broker address
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        // Key serializer
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        // Value serializer – we’ll override it below
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        // Disable headers that store Java type (optional)
        props.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        DefaultKafkaProducerFactory<String, Transactiondto> factory =
                new DefaultKafkaProducerFactory<>(props);
        // Inject our custom ObjectMapper into the JsonSerializer
        factory.setValueSerializer(new JsonSerializer<>(kafkaObjectMapper));
        return factory;
    }

    @Bean
    public KafkaTemplate<String, Transactiondto> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}