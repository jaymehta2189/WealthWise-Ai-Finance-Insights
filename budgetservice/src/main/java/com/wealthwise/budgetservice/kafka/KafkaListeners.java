package com.wealthwise.budgetservice.kafka;

import com.wealthwise.budgetservice.dto.Budgetdto;
import com.wealthwise.budgetservice.service.BudgetService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
//@RequiredArgsConstructor
public class KafkaListeners {

    private final BudgetService budgetService;

    public KafkaListeners(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    /**
     * Listens to transactions to update categorical spend in Mongo.
     */
    @KafkaListener(
            topics = "user-budget-topic",
            groupId = "budget-group",
            containerFactory = "transactionListenerFactory"   // <<< specify!
    )    public void onTransactionEvent(@Payload Budgetdto btDto) {
        System.out.println("dcscdscsdszsdvdrvd");
        budgetService.trackBudget(btDto);
    }
}