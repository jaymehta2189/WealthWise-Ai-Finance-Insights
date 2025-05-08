package com.wealthwise.budgetservice.dto;

import java.util.List;

public class BudgetSummaryResponse {
    private String userId;
    private List<CategoryBudgetResponse> categories;

    public BudgetSummaryResponse(String userId, List<CategoryBudgetResponse> categories) {
        this.userId = userId;
        this.categories = categories;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<CategoryBudgetResponse> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryBudgetResponse> categories) {
        this.categories = categories;
    }
}
