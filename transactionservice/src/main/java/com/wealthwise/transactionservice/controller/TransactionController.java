package com.wealthwise.transactionservice.controller;

import com.wealthwise.transactionservice.model.Transaction;
import com.wealthwise.transactionservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/transaction")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    public TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> makePayment(@RequestBody Transaction transaction){
        Transaction ts = transactionService.makePayment(transaction);

        return ResponseEntity.ok(ts);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getAllTransactionByUserId(@PathVariable String userId){
        return ResponseEntity.ok(transactionService.getAllTransactionByUserId(userId));
    }
}
