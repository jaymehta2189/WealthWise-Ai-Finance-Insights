package org.example.DTO;
//
//
//public class UserSpendingDTO {
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
//    public UserSpendingDTO() {
//    }
//
//    public UserSpendingDTO(String id,double monthlyIncome, double monthlyExpense, double savings, String investmentAvenues, int creditScore,  int financialLiteracyScore, String riskTolerance) {
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
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSpendingDTO {
    private String id;
    private double monthlyIncome;
    private double monthlyExpense;
    private double savings;
    private List<String> investmentAvenues;
    private boolean consent;
    private int financialLiteracyScore;
    private String riskTolerance;
}