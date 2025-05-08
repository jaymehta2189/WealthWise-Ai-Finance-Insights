package org.example.Repository;
//import org.example.Model.User;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//import java.util.Optional;
//
//public interface UserRepository extends MongoRepository<User, String> {
//    Optional<User> findByEmail(String email);
//}
import org.example.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}