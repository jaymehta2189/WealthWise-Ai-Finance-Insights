package com.wealthwise.transactionservice.kafka;

import com.wealthwise.transactionservice.dto.Transactiondto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class TransactionProducer {

    @Autowired
    private KafkaTemplate<String, Transactiondto> kafkaTemplate;

    private final ObjectMapper mapper = new ObjectMapper();
    private final String topic = "user-transaction-topic";
    private final String topic1= "user-budget-topic";
    public void sendToKafka(Transactiondto transaction) {
        try {
            kafkaTemplate.send(topic, transaction);
            kafkaTemplate.send(topic1,transaction);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
