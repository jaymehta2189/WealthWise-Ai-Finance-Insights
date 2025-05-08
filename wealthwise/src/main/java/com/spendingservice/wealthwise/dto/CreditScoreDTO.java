package com.spendingservice.wealthwise.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreditScoreDTO {
    private String userId;
    private int creditScore;
}
