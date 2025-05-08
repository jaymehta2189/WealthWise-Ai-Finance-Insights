//
//package org.example.config;
//
//import org.example.DTO.UserSpendingDTO;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.apache.kafka.clients.producer.ProducerConfig;
//import org.apache.kafka.common.serialization.StringSerializer;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.core.*;
//import org.springframework.kafka.support.serializer.JsonSerializer;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class KafkaProducerConfig {
//
//    @Autowired
//    private ObjectMapper kafkaObjectMapper;
//
//    @Bean
//    public ProducerFactory<String, UserSpendingDTO> producerFactory() {
//        Map<String, Object> props = new HashMap<>();
//        // Broker address
//        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//        // Key serializer
//        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
//        // Value serializer – we’ll override it below
//        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//        // Disable headers that store Java type (optional)
//        props.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);
//
//        DefaultKafkaProducerFactory<String, UserSpendingDTO> factory =
//                new DefaultKafkaProducerFactory<>(props);
//        // Inject our custom ObjectMapper into the JsonSerializer
//        factory.setValueSerializer(new JsonSerializer<>(kafkaObjectMapper));
//        return factory;
//    }
//
//    @Bean
//    public KafkaTemplate<String, UserSpendingDTO> kafkaTemplate() {
//        return new KafkaTemplate<>(producerFactory());
//    }
//}

package org.example.config;

import org.example.DTO.UserSpendingDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.serializer.JsonSerializer;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public ProducerFactory<String, UserSpendingDTO> producerFactory(ObjectMapper mapper) {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        props.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        DefaultKafkaProducerFactory<String, UserSpendingDTO> factory =
                new DefaultKafkaProducerFactory<>(props);
        factory.setValueSerializer(new JsonSerializer<>(mapper));
        return factory;
    }

    @Bean
    public KafkaTemplate<String, UserSpendingDTO> kafkaTemplate(ProducerFactory<String, UserSpendingDTO> pf) {
        return new KafkaTemplate<>(pf);
    }
}