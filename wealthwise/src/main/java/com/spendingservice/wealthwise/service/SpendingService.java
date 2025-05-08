package com.spendingservice.wealthwise.service;



import com.spendingservice.wealthwise.dto.CategoricalSpendDTO;
import com.spendingservice.wealthwise.dto.SpendingTrendDTO;
import com.spendingservice.wealthwise.dto.TransactionDTO;
import com.spendingservice.wealthwise.dto.UserSpendingDTO;
import com.spendingservice.wealthwise.model.CategoricalSpend;
import com.spendingservice.wealthwise.repository.CategoricalSpendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpendingService {
    @Autowired
    private final CategoricalSpendRepository repo;

    /**
     * Update user profile spending details (income, expense, savings, etc.)
     * triggered by UserSpendingDTO listener
     */
    public void updateUserProfile(UserSpendingDTO dto) {
        // For each existing period summary for user, update income and recalc savings
//        List<CategoricalSpend> all = repo.findByUserId(dto.getId());
//
//        for (CategoricalSpend cs : all) {
//            cs.setTotalIncome(dto.getMonthlyIncome());
//            cs.setNetSavings(dto.getMonthlyIncome() - cs.getTotalExpense());
//            repo.save(cs);
//        }
        YearMonth now      = YearMonth.now();
        String summaryId   = dto.getId() + ":" + now;
        CategoricalSpend cs = repo.findById(summaryId)
                .orElseGet(() -> CategoricalSpend.builder()
                        .id(summaryId)
                        .userId(dto.getId())
                        .period(now)
                        .byCategory(new HashMap<>())
                        .totalExpense(0.0)
                        .build());

        cs.setTotalIncome(dto.getMonthlyIncome());
        cs.setNetSavings(cs.getTotalIncome() - cs.getTotalExpense());
        repo.save(cs);
    }

    /**
     * Record a transaction event, update or create category summary
     */
    public void recordTransaction(TransactionDTO tx) {
        YearMonth period = YearMonth.from(tx.getTimestamp());
        String summaryId = tx.getUserId() + ":" + period;

        CategoricalSpend cs = repo.findById(summaryId)
                .orElseGet(() -> CategoricalSpend.builder()
                        .id(summaryId)
                        .userId(tx.getUserId())
                        .period(period)
                        .byCategory(new HashMap<>())
                        .totalIncome(0)
                        .totalExpense(0)
                        .netSavings(0)
                        .build());

        // Update category totals
        Map<String, Double> catMap = cs.getByCategory();
//        double prev = catMap.getOrDefault(tx.getCategory(), 0.0);
//        double updated = "DEBIT".equalsIgnoreCase(tx.getType()) ? prev + tx.getAmount() : prev;
//        catMap.put(tx.getCategory(), updated);
//
//        // Update totals
//        double totalExpense = catMap.values().stream().mapToDouble(Double::doubleValue).sum();
//        cs.setTotalExpense(totalExpense);
        if ("CREDIT".equalsIgnoreCase(tx.getType())) {
            cs.setTotalIncome(cs.getTotalIncome() + tx.getAmount());
        } else {
            // existing DEBIT handling
            double prev = catMap.getOrDefault(tx.getCategory(), 0.0);
            catMap.put(tx.getCategory(), prev + tx.getAmount());
            double totalExpense = catMap.values().stream().mapToDouble(Double::doubleValue).sum();
            cs.setTotalExpense(totalExpense);
        }
        // leave totalIncome as is (will be set by user profile updates)
        cs.setNetSavings(cs.getTotalIncome() - cs.getTotalExpense());
        System.out.println(cs);
        repo.save(cs);
    }


    public CategoricalSpendDTO getMonthlySummary(String userId, YearMonth period) {
        String id = userId + ":" + period;
        CategoricalSpend cs = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Summary not found"));
        return map(cs);
    }

    public List<SpendingTrendDTO> getExpenseTrend(String userId,
                                                  YearMonth start,
                                                  YearMonth end) {
        List<CategoricalSpend> list = repo.findByUserIdAndPeriodBetween(userId, start, end);
        var trend = list.stream()
                .collect(Collectors.toMap(CategoricalSpend::getPeriod,
                        CategoricalSpend::getTotalExpense));
        return List.of(SpendingTrendDTO.builder()
                .userId(userId)
                .startPeriod(start)
                .endPeriod(end)
                .expenseTrend(trend)
                .build());
    }

    public List<CategoricalSpendDTO> getAllSummaries(String userId) {
        return repo.findByUserId(userId).stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    private CategoricalSpendDTO map(CategoricalSpend cs) {
        return CategoricalSpendDTO.builder()
                .userId(cs.getUserId())
                .period(cs.getPeriod())
                .byCategory(cs.getByCategory())
                .totalExpense(cs.getTotalExpense())
                .totalIncome(cs.getTotalIncome())
                .netSavings(cs.getNetSavings())
                .build();
    }

    public double getExpenseByCategory(String userId, YearMonth period, String category) {
        String id = userId + ":" + period;
        CategoricalSpend cs = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("No summary for " + period));
        return cs.getByCategory().getOrDefault(category, 0.0);
    }

    /**
     * Returns the total income for a user in a given month.
     */
    public double getTotalIncome(String userId, YearMonth period) {
        String id = userId + ":" + period;
        CategoricalSpend cs = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("No summary for " + period));
        return cs.getTotalIncome();
    }

    /**
     * 3) Compute a composite credit score (300–850) based on:
     *    - Income-to-expense ratio (30%) :contentReference[oaicite:0]{index=0}
     *    - Savings-to-income ratio (20%) :contentReference[oaicite:1]{index=1}
     *    - Existing creditScore field (20%) :contentReference[oaicite:2]{index=2}
     *    - Financial literacy (15%) and risk tolerance (15%)
     */
//    public int calculateCreditScore(String userId) {
//        YearMonth now = YearMonth.now();
//        String id = userId + ":" + now;
//        CategoricalSpend cs = repo.findById(id)
//                .orElseThrow(() -> new RuntimeException("No summary for " + now));
//
//        double income       = cs.getTotalIncome();
//        double expense      = cs.getTotalExpense();
//        double savings      = cs.getNetSavings();
//        int baseScore       = cs.getUser().getCreditScore();          // existing score
//
//        // 1) Income-to-expense ratio (ideal >3) → normalized 0–1
//        double ieRatioNorm  = Math.min(1.0, income / (expense + 1)) / 3.0;  // max at 3:1 :contentReference[oaicite:3]{index=3}
//
//        // 2) Savings-to-income ratio (ideal >0.2) → normalized 0–1
//        double siRatioNorm  = Math.min(1.0, savings / (income + 1)) / 0.2;  // max at 20% :contentReference[oaicite:4]{index=4}
//
//        // 3) Credit history component (using existing FICO bucket) 300–850 mapped 0–1
//        double chNorm        = (baseScore - 300) / 550.0;                // :contentReference[oaicite:5]{index=5}
//
//        // 4) Financial literacy (1–10) → 0–1
//        double flNorm        = (cs.getUser().getFinancialLiteracyScore() - 1) / 9.0;
//
//        // 5) Risk tolerance: Low=0.5, Medium=1.0, High=1.5 → capped 0–1 after scaling
//        double rtFactor      = switch (cs.getUser().getRiskTolerance().toUpperCase()) {
//            case "LOW"    -> 0.5;
//            case "HIGH"   -> 1.5;
//            default       -> 1.0;
//        };
//        double rtNorm        = Math.min(1.0, rtFactor / 1.5);
//
//        // Weighted sum (total weight = 1.0)
//        double compositeNorm =
//                ieRatioNorm * 0.30 +
//                        siRatioNorm * 0.20 +
//                        chNorm     * 0.20 +
//                        flNorm     * 0.15 +
//                        rtNorm     * 0.15;
//
//        // Map back to credit-score range [300,850]
//        int finalScore = (int) Math.round(300 + compositeNorm * 550);
//        return Math.min(850, Math.max(300, finalScore));
//    }

    public List<String> generateMonthlyInsights(String userId, YearMonth currentPeriod) {
        YearMonth previousPeriod = currentPeriod.minusMonths(1);
        String currentId = userId + ":" + currentPeriod;
        String prevId = userId + ":" + previousPeriod;

        Optional<CategoricalSpend> currentOpt = repo.findById(currentId);
        Optional<CategoricalSpend> prevOpt = repo.findById(prevId);

        if (currentOpt.isEmpty() || prevOpt.isEmpty()) {
            return List.of("Not enough data to generate insights.");
        }

        CategoricalSpend current = currentOpt.get();
        CategoricalSpend previous = prevOpt.get();

        List<String> insights = new ArrayList<>();

        // 1. Compare total expenses
        double currExp = current.getTotalExpense();
        double prevExp = previous.getTotalExpense();
        if (currExp > prevExp) {
            double diff = currExp - prevExp;
            double percent = (diff / prevExp) * 100;
            insights.add(String.format("Your total spending increased by %.1f%% compared to last month.", percent));
        } else if (currExp < prevExp) {
            double diff = prevExp - currExp;
            double percent = (diff / prevExp) * 100;
            insights.add(String.format("Great job! You reduced your spending by %.1f%% from last month.", percent));
        }

        // 2. Compare total income
        double currInc = current.getTotalIncome();
        double prevInc = previous.getTotalIncome();
        if (currInc != prevInc) {
            double diff = currInc - prevInc;
            double percent = prevInc == 0 ? 100 : (diff / prevInc) * 100;
            insights.add(String.format("Your income %s by %.1f%% compared to last month.",
                    diff > 0 ? "increased" : "decreased", Math.abs(percent)));
        }

        // 3. Compare net savings
        double currSav = current.getNetSavings();
        double prevSav = previous.getNetSavings();
        if (currSav != prevSav) {
            double diff = currSav - prevSav;
            double percent = prevSav == 0 ? 100 : (diff / Math.abs(prevSav)) * 100;
            insights.add(String.format("Your savings %s by %.1f%% from last month.",
                    diff > 0 ? "increased" : "decreased", Math.abs(percent)));
        }

        // 4. Compare category-wise expenses
        Map<String, Double> currCats = current.getByCategory();
        Map<String, Double> prevCats = previous.getByCategory();

        for (String category : currCats.keySet()) {
            double currAmt = currCats.getOrDefault(category, 0.0);
            double prevAmt = prevCats.getOrDefault(category, 0.0);

            if (prevAmt == 0 && currAmt > 0) {
                insights.add(String.format("New spending category detected: ₹%.2f on %s.",
                        currAmt, category));
            } else if (currAmt > prevAmt) {
                double diff = currAmt - prevAmt;
                double percent = (diff / prevAmt) * 100;
                insights.add(String.format("You spent %.1f%% more on %s compared to last month.",
                        percent, category));
            } else if (currAmt < prevAmt) {
                double diff = prevAmt - currAmt;
                double percent = (diff / prevAmt) * 100;
                insights.add(String.format("You spent %.1f%% less on %s than last month.",
                        percent, category));
            }
        }

        // 5. Detect removed categories
        for (String prevCat : prevCats.keySet()) {
            if (!currCats.containsKey(prevCat)) {
                insights.add(String.format("You didn’t spend anything on %s this month.", prevCat));
            }
        }

        return insights;
    }

}