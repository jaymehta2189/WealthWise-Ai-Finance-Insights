package com.wealthwise.budgetservice.service;


import com.wealthwise.budgetservice.constants.BudgetCategory;
import com.wealthwise.budgetservice.dto.BudgetSummaryResponse;
import com.wealthwise.budgetservice.dto.Budgetdto;
import com.wealthwise.budgetservice.dto.CategoryBudgetResponse;
import com.wealthwise.budgetservice.model.Budget;
import com.wealthwise.budgetservice.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;

    public Budget createBudget(Budget budget) {
        // ensure spentSoFar is initialized
        System.out.println("dsfcsdszfz");
        if (budget.getSpentSoFar().isEmpty()) {
            for (BudgetCategory c : BudgetCategory.values()) {
                budget.getSpentSoFar().put(c, 0.0);
            }
        }
        // initialize lastSummary based on the (empty) spentSoFar
        budget.setLastSummary(
                budget.getCategoryLimits().entrySet().stream()
                        .map(e -> new CategoryBudgetResponse(e.getKey(), e.getValue(), 0.0))
                        .collect(Collectors.toList())
        );
        return budgetRepository.save(budget);
    }

    public void trackBudget(Budgetdto dto) {
        // 1. Load existing budget; if missing, create a new one and return
        Budget budget = budgetRepository.findByUserId(dto.getUserId());
        if (budget == null) {
            System.out.println("No budget found for user: " + dto.getUserId());
            return;
        }

        // 2. Validate that dto.timestamp is within the startMonth and endMonth range
        LocalDateTime txTimestamp = dto.getTimestamp();
        if (txTimestamp == null) {
            System.out.println("Transaction timestamp is null for user: " + dto.getUserId());
            return;
        }
        if (txTimestamp.isBefore(budget.getStartMonth()) || txTimestamp.isAfter(budget.getEndMonth())) {
            System.out.println("Transaction timestamp is outside the budget's date range.");
            return;
        }

        // 3. Update spentSoFar for the specified category
        try {
            BudgetCategory category = BudgetCategory.valueOf(dto.getCategory());
            double updatedAmount = budget.getSpentSoFar().getOrDefault(category, 0.0) + dto.getAmount();
            budget.getSpentSoFar().put(category, updatedAmount);
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid category specified: " + dto.getCategory());
            return;
        }

        // 4. Build the per-category summary
        List<CategoryBudgetResponse> summaryList = budget.getCategoryLimits().entrySet().stream()
                .map(entry -> {
                    BudgetCategory category = entry.getKey();
                    double limit = entry.getValue();
                    double spent = budget.getSpentSoFar().getOrDefault(category, 0.0);
                    return new CategoryBudgetResponse(category, limit, spent);
                })
                .collect(Collectors.toList());

        budget.setLastSummary(summaryList);

        // 5. Save the updated budget
        budgetRepository.save(budget);
    }

    private BudgetSummaryResponse buildSummary(Budget b) {
        List<CategoryBudgetResponse> list = b.getCategoryLimits().entrySet().stream()
                .map(e -> {
                    BudgetCategory c    = e.getKey();
                    Double decided      = e.getValue();
                    Double spent        = b.getSpentSoFar().getOrDefault(c, 0.0);
                    return new CategoryBudgetResponse(c, decided, spent);
                })
                .collect(Collectors.toList());

        return new BudgetSummaryResponse(b.getUserId(), list);
    }

    public List<CategoryBudgetResponse> getLastSummary(String userId) {
        Budget budget = budgetRepository.findByUserId(userId);
        return budget.getLastSummary();
    }
}
