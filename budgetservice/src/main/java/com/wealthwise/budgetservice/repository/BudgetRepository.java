package com.wealthwise.budgetservice.repository;


import com.wealthwise.budgetservice.model.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends MongoRepository<Budget,String> {

    Budget findByUserId(String userId);
}
