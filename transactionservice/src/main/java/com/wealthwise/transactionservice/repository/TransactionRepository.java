package com.wealthwise.transactionservice.repository;

import com.wealthwise.transactionservice.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction,String> {

    List<Transaction> findAllByUserId(String userId);
}
