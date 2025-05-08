package com.spendingservice.wealthwise.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSpendingDTO {
    private String id;
    private double monthlyIncome;
    private double monthlyExpense;
    private double savings;
    private List<String> investmentAvenues;
    private int creditScore;
    private int financialLiteracyScore;
    private String riskTolerance;
}