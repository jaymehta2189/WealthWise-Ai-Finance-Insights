package com.wealthwise.budgetservice.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.wealthwise.budgetservice.constants.BudgetCategory;
import com.wealthwise.budgetservice.dto.CategoryBudgetResponse;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;

@Document(collection = "budget")
public class Budget {
    @Id
    private String id;

    private String userId;

    private Map<BudgetCategory, Double> categoryLimits = new HashMap<>();
    private Map<BudgetCategory, Double> spentSoFar = new HashMap<>();
    private LocalDateTime startMonth;
    private LocalDateTime endMonth;
    private List<CategoryBudgetResponse> lastSummary = new ArrayList<>();

    // getters + setters for lastSummary
    public List<CategoryBudgetResponse> getLastSummary() {
        return lastSummary;
    }
    public void setLastSummary(List<CategoryBudgetResponse> lastSummary) {
        this.lastSummary = lastSummary;
    }

    public Budget(String id, String userId, Map<BudgetCategory, Double> categoryLimits, Map<BudgetCategory, Double> spentSoFar, LocalDateTime startMonth, LocalDateTime endMonth) {
        this.id = id;
        this.userId = userId;
        this.categoryLimits = categoryLimits;
        this.spentSoFar = spentSoFar;
        this.startMonth = startMonth;
        this.endMonth = endMonth;
    }

    public Budget() {
        this.categoryLimits = new EnumMap<>(BudgetCategory.class);
        this.spentSoFar     = new EnumMap<>(BudgetCategory.class);
        this.lastSummary    = new ArrayList<>();

        for (BudgetCategory cat : BudgetCategory.values()) {
            this.categoryLimits.put(cat, 0.0);
            this.spentSoFar.put(cat,     0.0);
        }
    }

    public Budget(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public Map<BudgetCategory, Double> getSpentSoFar() {
        return spentSoFar;
    }

    public void setSpentSoFar(Map<BudgetCategory, Double> spentSoFar) {
        this.spentSoFar = spentSoFar;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Map<BudgetCategory, Double> getCategoryLimits() {
        return categoryLimits;
    }

    public void setCategoryLimits(Map<BudgetCategory, Double> categoryLimits) {
        this.categoryLimits = categoryLimits;
    }

    public LocalDateTime getStartMonth() {
        return startMonth;
    }

    public void setStartMonth(LocalDateTime startMonth) {
        this.startMonth = startMonth;
    }

    public LocalDateTime getEndMonth() {
        return endMonth;
    }

    public void setEndMonth(LocalDateTime endMonth) {
        this.endMonth = endMonth;
    }

}
