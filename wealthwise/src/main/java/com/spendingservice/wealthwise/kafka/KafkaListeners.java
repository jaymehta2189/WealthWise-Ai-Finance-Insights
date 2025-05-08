package com.spendingservice.wealthwise.kafka;


import com.spendingservice.wealthwise.dto.TransactionDTO;
import com.spendingservice.wealthwise.dto.UserSpendingDTO;
import com.spendingservice.wealthwise.service.SpendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaListeners {

    private final SpendingService spendingService;

    /**
     * Listens to user profile updates to capture income and risk tolerance, etc.
     */
    @KafkaListener(
            topics = "user-spending-topic",
            groupId = "spending-group",
            containerFactory = "userSpendingListenerFactory"   // <<< specify!
    )
    public void onUserSpendingUpdate(@Payload UserSpendingDTO dto) {
        spendingService.updateUserProfile(dto);
    }

    /**
     * Listens to transactions to update categorical spend in Mongo.
     */
    @KafkaListener(
            topics = "user-transaction-topic",
            groupId = "spending-group",
            containerFactory = "transactionListenerFactory"   // <<< specify!
    )    public void onTransactionEvent(@Payload TransactionDTO txDto) {
        System.out.println("dcscdscsdszsdvdrvd");
        spendingService.recordTransaction(txDto);
    }
}
