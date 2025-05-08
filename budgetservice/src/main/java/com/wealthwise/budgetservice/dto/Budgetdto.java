package com.wealthwise.budgetservice.dto;

import com.wealthwise.budgetservice.constants.BudgetCategory;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.Map;

public class Budgetdto {
    private String userId;
    private LocalDateTime timestamp;
    private String category;
    private Double amount;
    private String type;

    public String getUserId() {
        return userId;
    }

    public String getType() {
        return type;
    }

    public Double getAmount() {
        return amount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getCategory() {
        return category;
    }
}
