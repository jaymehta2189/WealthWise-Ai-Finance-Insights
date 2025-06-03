package com.wealthwise.budgetservice.controller;

import com.wealthwise.budgetservice.dto.CategoryBudgetResponse;
import com.wealthwise.budgetservice.model.Budget;
import com.wealthwise.budgetservice.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/budget")
@CrossOrigin(origins = "*")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    @PostMapping
    public ResponseEntity<Budget> createBudget(@RequestBody Budget budget){
        return ResponseEntity.ok(budgetService.createBudget(budget));
    }

    @GetMapping("/{userId}/summary")
    public ResponseEntity<List<CategoryBudgetResponse>> getLastSummary(
            @PathVariable String userId) {
        List<CategoryBudgetResponse> summary = budgetService.getLastSummary(userId);
        return ResponseEntity.ok(summary);
    }
    @PostMapping("/{userId}/edit")
    public ResponseEntity<Budget> editBudget(@PathVariable String userId,@RequestBody Budget budget){
        return ResponseEntity.ok(budgetService.editBudget(userId,budget));
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteBudget(@PathVariable String userId) {
        budgetService.deleteBudget(userId);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }

}
