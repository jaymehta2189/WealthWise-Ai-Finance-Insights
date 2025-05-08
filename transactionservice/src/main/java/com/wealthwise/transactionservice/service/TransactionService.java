package com.wealthwise.transactionservice.service;


import com.wealthwise.transactionservice.dto.Transactiondto;
import com.wealthwise.transactionservice.kafka.TransactionProducer;
import com.wealthwise.transactionservice.model.Transaction;
import com.wealthwise.transactionservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionProducer transactionProducer;

    public Transaction makePayment(Transaction transaction){
        transaction.setTimestamp(LocalDateTime.now());
        Transaction savedTransaction =  transactionRepository.save(transaction);
        Transactiondto transactiondto = new Transactiondto();
        transactiondto.setUserId(transaction.getUserId());
        transactiondto.setCategory(transaction.getCategory());
        transactiondto.setTimestamp(savedTransaction.getTimestamp());
        transactiondto.setAmount(transaction.getAmount());
        transactiondto.setType(transaction.getType());
        transactionProducer.sendToKafka(transactiondto);

        return  savedTransaction;
    }

    public List<Transaction> getAllTransactionByUserId(String userId){
        return transactionRepository.findAllByUserId(userId);
    }

}
