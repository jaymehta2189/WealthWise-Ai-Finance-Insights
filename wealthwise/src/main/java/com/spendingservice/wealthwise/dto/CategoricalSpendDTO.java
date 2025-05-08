package com.spendingservice.wealthwise.dto;


import lombok.*;
import java.time.YearMonth;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoricalSpendDTO {
    private String userId;
    private YearMonth period;
    private Map<String, Double> byCategory;
    private double totalExpense;
    private double totalIncome;
    private double netSavings;
}
