package com.spendingservice.wealthwise.dto;
//
//
//public class ProfileSummaryRequest {
//    private String id;
//    private double monthlyIncome;
//    private double monthlyExpense;
//    private double savings;
//    private String investmentAvenues;
//    private int creditScore;
//    private int financialLiteracyScore;
//    private String riskTolerance;
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public ProfileSummaryRequest() {
//    }
//    public ProfileSummaryRequest(String id,double monthlyIncome, double monthlyExpense, String investmentAvenues,double savings,  int creditScore,  int financialLiteracyScore, String riskTolerance) {
//        this.id = id;
//        this.monthlyIncome = monthlyIncome;
//        this.monthlyExpense = monthlyExpense;
//        this.savings = savings;
//        this.investmentAvenues = investmentAvenues;
//        this.creditScore = creditScore;
//        this.financialLiteracyScore = financialLiteracyScore;
//        this.riskTolerance = riskTolerance;
//    }
//
//    public double getMonthlyIncome() {
//        return monthlyIncome;
//    }
//
//    public void setMonthlyIncome(double monthlyIncome) {
//        this.monthlyIncome = monthlyIncome;
//    }
//
//    public double getMonthlyExpense() {
//        return monthlyExpense;
//    }
//
//    public void setMonthlyExpense(double monthlyExpense) {
//        this.monthlyExpense = monthlyExpense;
//    }
//
//    public double getSavings() {
//        return savings;
//    }
//
//    public void setSavings(double savings) {
//        this.savings = savings;
//    }
//
//    public String getInvestmentAvenues() {
//        return investmentAvenues;
//    }
//
//    public void setInvestmentAvenues(String investmentAvenues) {
//        this.investmentAvenues = investmentAvenues;
//    }
//
//    public int getCreditScore() {
//        return creditScore;
//    }
//
//    public void setCreditScore(int creditScore) {
//        this.creditScore = creditScore;
//    }
//
//
//
//    public int getFinancialLiteracyScore() {
//        return financialLiteracyScore;
//    }
//
//    public void setFinancialLiteracyScore(int financialLiteracyScore) {
//        this.financialLiteracyScore = financialLiteracyScore;
//    }
//
//    public String getRiskTolerance() {
//        return riskTolerance;
//    }
//
//    public void setRiskTolerance(String riskTolerance) {
//        this.riskTolerance = riskTolerance;
//    }
//}



import lombok.*;
import java.time.YearMonth;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpendingTrendDTO {
    private String userId;
    private YearMonth startPeriod;
    private YearMonth endPeriod;
    private Map<YearMonth, Double> expenseTrend;
}