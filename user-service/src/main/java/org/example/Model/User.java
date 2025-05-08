//package org.example.Model;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//
//@Document("users")
//public class User {
//
//    @Id
//    private String id;
//
//    private int age;                        // Age of the user
//    private String gender;                 // Male/Female/Other
//    private String occupation;             // e.g., Student, Engineer
//    private String email;
//    private double monthlyIncome;          // Monthly income
//    private double monthlyExpense;         // Monthly spending
//    private double savings;                // How much they save monthly
//
//    private String investmentAvenues;      // e.g., Mutual Funds, Stocks, FD
//    private int creditScore;               // e.g., 720
//    private String financialGoals;         // e.g., Retirement, Education
//    private int financialLiteracyScore;    // e.g., 1 to 10
//    private String riskTolerance;          // e.g., Low, Medium, High
//
//    // ---------------- Constructors ----------------
//
//    public User() {}
//
//    public User(int age, String gender, String occupation,String email, double monthlyIncome, double monthlyExpense,
//                double savings, String investmentAvenues, int creditScore, String financialGoals,
//                int financialLiteracyScore, String riskTolerance) {
//        this.age = age;
//        this.gender = gender;
//        this.occupation = occupation;
//        this.email=email;
//        this.monthlyIncome = monthlyIncome;
//        this.monthlyExpense = monthlyExpense;
//        this.savings = savings;
//        this.investmentAvenues = investmentAvenues;
//        this.creditScore = creditScore;
//        this.financialGoals = financialGoals;
//        this.financialLiteracyScore = financialLiteracyScore;
//        this.riskTolerance = riskTolerance;
//    }
//
//    // ---------------- Getters and Setters ----------------
//
//    public String getId() { return id; }
//
//    public int getAge() { return age; }
//    public void setAge(int age) { this.age = age; }
//
//    public String getGender() { return gender; }
//    public void setGender(String gender) { this.gender = gender; }
//
//    public String getOccupation() { return occupation; }
//    public void setOccupation(String occupation) { this.occupation = occupation; }
//
//    public double getMonthlyIncome() { return monthlyIncome; }
//    public void setMonthlyIncome(double monthlyIncome) { this.monthlyIncome = monthlyIncome; }
//
//    public double getMonthlyExpense() { return monthlyExpense; }
//    public void setMonthlyExpense(double monthlyExpense) { this.monthlyExpense = monthlyExpense; }
//
//    public double getSavings() { return savings; }
//    public void setSavings(double savings) { this.savings = savings; }
//
//    public String getInvestmentAvenues() { return investmentAvenues; }
//    public void setInvestmentAvenues(String investmentAvenues) { this.investmentAvenues = investmentAvenues; }
//
//    public int getCreditScore() { return creditScore; }
//    public void setCreditScore(int creditScore) { this.creditScore = creditScore; }
//
//    public String getFinancialGoals() { return financialGoals; }
//    public void setFinancialGoals(String financialGoals) { this.financialGoals = financialGoals; }
//
//    public int getFinancialLiteracyScore() { return financialLiteracyScore; }
//    public void setFinancialLiteracyScore(int financialLiteracyScore) { this.financialLiteracyScore = financialLiteracyScore; }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getRiskTolerance() { return riskTolerance; }
//    public void setRiskTolerance(String riskTolerance) { this.riskTolerance = riskTolerance; }
//}
package org.example.Model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    @Min(18) @Max(100)
    private int age;

    @NotBlank
    private String gender;

    @NotBlank
    private String occupation;

    @Email @NotBlank
    private String email;
    @Size(min = 6)
    private String password;
    @PositiveOrZero
    private double monthlyIncome;

    @PositiveOrZero
    private double monthlyExpense;

    @PositiveOrZero
    private double savings;

    @Singular
    private List<String> investmentAvenues;

    private boolean consent;

    @Singular
    private List<String> financialGoals;

    @Min(1) @Max(10)
    private int financialLiteracyScore;

    @NotBlank
    private String riskTolerance;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}