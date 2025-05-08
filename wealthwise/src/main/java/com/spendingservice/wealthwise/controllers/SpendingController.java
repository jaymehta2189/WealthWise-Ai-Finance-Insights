package com.spendingservice.wealthwise.controllers;

import com.spendingservice.wealthwise.dto.CategoricalSpendDTO;
import com.spendingservice.wealthwise.dto.CreditScoreDTO;
import com.spendingservice.wealthwise.dto.SpendingTrendDTO;
import com.spendingservice.wealthwise.dto.SpendingValueDTO;
import com.spendingservice.wealthwise.service.SpendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/v1/spending")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SpendingController {
    private final SpendingService service;

    @GetMapping("/{userId}/summary/{period}")
    public ResponseEntity<CategoricalSpendDTO> monthlySummary(
            @PathVariable String userId,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM") YearMonth period) {
        return ResponseEntity.ok(service.getMonthlySummary(userId, period));
    }

    @GetMapping("/{userId}/trend")
    public ResponseEntity<List<SpendingTrendDTO>> trend(
            @PathVariable String userId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth start,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth end) {
        return ResponseEntity.ok(service.getExpenseTrend(userId, start, end));
    }

    @GetMapping("/{userId}/all")
    public ResponseEntity<List<CategoricalSpendDTO>> allSummaries(
            @PathVariable String userId) {
        return ResponseEntity.ok(service.getAllSummaries(userId));
    }
    @GetMapping("/{userId}/investment")
    public ResponseEntity<SpendingValueDTO> getInvestmentExpense(
            @PathVariable String userId,
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM") YearMonth period) {
        YearMonth ym = (period != null) ? period : YearMonth.now();
        double invested = service.getExpenseByCategory(userId, ym, "Investment");
        return ResponseEntity.ok(new SpendingValueDTO(userId, ym, "Investment", invested));
    }

    /**
     * 2) Total income for the specified (or current) month
     */
    @GetMapping("/{userId}/income")
    public ResponseEntity<SpendingValueDTO> getTotalIncome(
            @PathVariable String userId,
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM") YearMonth period) {
        YearMonth ym = (period != null) ? period : YearMonth.now();
        double income = service.getTotalIncome(userId, ym);
        return ResponseEntity.ok(new SpendingValueDTO(userId, ym, "Income", income));
    }

    /**
     * 3) Compute a derived credit score based on financial metrics
     */
  //  @GetMapping("/{userId}/credit-score")
//    public ResponseEntity<CreditScoreDTO> getCreditScore(
//            @PathVariable String userId) {
//        int score = service.calculateCreditScore(userId);
//        return ResponseEntity.ok(new CreditScoreDTO(userId, score));
//    }
    @GetMapping("/{userId}/insights")
    public ResponseEntity<List<String>> getInsights(@PathVariable String userId,@RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth period){
        return ResponseEntity.ok(service.generateMonthlyInsights(userId,period));
    }

}