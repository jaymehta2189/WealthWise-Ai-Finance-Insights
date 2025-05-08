package com.spendingservice.wealthwise.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.YearMonth;


@Data
@AllArgsConstructor
public class SpendingValueDTO {
    private String userId;
    private YearMonth period;
    private String label;   // "Investment" or "Income"
    private double value;
}
