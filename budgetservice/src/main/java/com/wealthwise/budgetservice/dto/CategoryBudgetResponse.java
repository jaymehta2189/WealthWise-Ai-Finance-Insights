package com.wealthwise.budgetservice.dto;

import com.wealthwise.budgetservice.constants.BudgetCategory;

public class CategoryBudgetResponse {

    private BudgetCategory  category;
    private Double decidedBudget;
    private Double totalSpends;

    public CategoryBudgetResponse(BudgetCategory  category, Double decidedBudget, Double totalSpends) {
        this.category = category;
        this.decidedBudget = decidedBudget;
        this.totalSpends = totalSpends;
    }

    public BudgetCategory  getCategory() {
        return category;
    }

    public void setCategory(BudgetCategory category) {
        this.category = category;
    }

    public Double getDecidedBudget() {
        return decidedBudget;
    }

    public void setDecidedBudget(Double decidedBudget) {
        this.decidedBudget = decidedBudget;
    }

    public Double getTotalSpends() {
        return totalSpends;
    }

    public void setTotalSpends(Double totalSpends) {
        this.totalSpends = totalSpends;
    }
}
