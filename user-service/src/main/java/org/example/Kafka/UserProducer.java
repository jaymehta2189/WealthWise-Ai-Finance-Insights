
package org.example.Kafka;

import org.example.DTO.UserSpendingDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserProducer {
    private final KafkaTemplate<String, UserSpendingDTO> kafkaTemplate;
    private final String topic = "user-spending-topic";

    public void sendSpendingEvent(UserSpendingDTO dto) {
        kafkaTemplate.send(topic, dto.getId(), dto);
    }
}