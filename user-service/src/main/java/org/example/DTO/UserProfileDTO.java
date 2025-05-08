package org.example.DTO;


import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private String id;
    private int age;
    private String gender;
    private String occupation;
    private String email;
    private double monthlyIncome;
    private double monthlyExpense;
    private double savings;
    private List<String> investmentAvenues;
    private boolean consent;
    private List<String> financialGoals;
    private int financialLiteracyScore;
    private String riskTolerance;
}