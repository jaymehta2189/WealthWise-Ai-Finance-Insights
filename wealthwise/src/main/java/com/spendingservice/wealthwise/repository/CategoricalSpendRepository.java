package com.spendingservice.wealthwise.repository;
//
//import com.spendingservice.wealthwise.model.Spending;
//import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface SpendingRepository extends MongoRepository<Spending, String> {
//    List<Spending> findByUserId(String userId);
//}
import com.spendingservice.wealthwise.model.CategoricalSpend;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.YearMonth;
import java.util.List;

public interface CategoricalSpendRepository extends MongoRepository<CategoricalSpend, String> {
    List<CategoricalSpend> findByUserId(String userId);
    List<CategoricalSpend> findByUserIdAndPeriodBetween(
            String userId, YearMonth start, YearMonth end);
}