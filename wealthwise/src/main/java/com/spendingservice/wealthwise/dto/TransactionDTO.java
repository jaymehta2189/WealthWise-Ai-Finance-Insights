package com.spendingservice.wealthwise.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDTO {
    private String userId;
    private String category;
    private String type;        // "DEBIT" or "CREDIT"
    private double amount;
    private LocalDateTime timestamp;
}