package com.spendingservice.wealthwise.model;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//import java.time.LocalDate;
//
//@Document(collection = "spending")
//public class Spending {
//    @Id
//    private String id;
//    private String userId;                 // Reference to User microservice
//
//    private double monthlyIncome;
//    private double monthlyExpense;
//    private double savings;
//
//    private int creditScore;
//    private int financialLiteracyScore;
//    private String riskTolerance;
//    private String investmentAvenues;
//
//    private LocalDate recordDate;         // When this record was generated
//    private String recordType;            // e.g., "transaction" or "profile-summary"
//    private double amount;                // For transactions only
//
//    public Spending() {
//    }
//
//    // Constructor for profile-summary
//    public Spending(String userId,
//                          double monthlyIncome,
//                          double monthlyExpense,
//                          String investmentAvenues,
//                          double savings,
//
//                          int creditScore,
//                          int financialLiteracyScore,
//                          String riskTolerance) {
//        this.userId = userId;
//        this.monthlyIncome = monthlyIncome;
//        this.monthlyExpense = monthlyExpense;
//        this.savings = savings;
//        this.investmentAvenues = investmentAvenues;
//        this.creditScore = creditScore;
//        this.financialLiteracyScore = financialLiteracyScore;
//        this.riskTolerance = riskTolerance;
//        this.recordType = "profile-summary";
//        this.recordDate = LocalDate.now();
//    }
//
//    // Constructor for transactions
//    public Spending(String userId,
//                          LocalDate recordDate,
//                          String category,
//                          double amount) {
//        this.userId = userId;
//        this.recordDate = recordDate;
//        this.recordType = category;
//        this.amount = amount;
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
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getUserId() {
//        return userId;
//    }
//
//    public void setUserId(String userId) {
//        this.userId = userId;
//    }
//
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
//    public int getCreditScore() {
//        return creditScore;
//    }
//
//    public void setCreditScore(int creditScore) {
//        this.creditScore = creditScore;
//    }
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
//
//    public LocalDate getRecordDate() {
//        return recordDate;
//    }
//
//    public void setRecordDate(LocalDate recordDate) {
//        this.recordDate = recordDate;
//    }
//
//    public String getRecordType() {
//        return recordType;
//    }
//
//    public void setRecordType(String recordType) {
//        this.recordType = recordType;
//    }
//
//    public double getAmount() {
//        return amount;
//    }
//
//    public void setAmount(double amount) {
//        this.amount = amount;
//    }
//}


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.YearMonth;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "spending_summaries")
public class CategoricalSpend {
    @Id
    private String id;                // format: userId:YYYY-MM
    private String userId;
    private YearMonth period;
    private Map<String, Double> byCategory;
    private double totalExpense;
    private double totalIncome;
    private double netSavings;
}

