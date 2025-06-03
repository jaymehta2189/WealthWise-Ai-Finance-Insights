package com.wealthwise.budgetservice.repository;


import com.wealthwise.budgetservice.model.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository extends MongoRepository<Budget,String> {

    Budget findByUserId(String userId);
    Optional<Budget> findTopByUserIdOrderByEndMonthDesc(String userId);
    void deleteAllByUserId(String userId);

}
