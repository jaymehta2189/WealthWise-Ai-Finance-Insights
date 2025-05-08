package org.example.Service;


import org.example.DTO.*;
import org.example.exception.ResourceNotFoundException;
import org.example.Kafka.UserProducer;
import org.example.Model.User;
import org.example.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserProducer userProducer;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Transactional
    public UserProfileDTO register(UserProfileDTO dto) {
        User existing = userRepository.findById(dto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + dto.getId()));

        existing.setAge(dto.getAge());
        existing.setGender(dto.getGender());
        existing.setOccupation(dto.getOccupation());
        existing.setEmail(dto.getEmail());
        existing.setMonthlyIncome(dto.getMonthlyIncome());
        existing.setMonthlyExpense(dto.getMonthlyExpense());
        existing.setSavings(dto.getSavings());
        existing.setInvestmentAvenues(dto.getInvestmentAvenues());
        existing.setConsent(dto.isConsent());
        existing.setFinancialGoals(dto.getFinancialGoals());
        existing.setFinancialLiteracyScore(dto.getFinancialLiteracyScore());
        existing.setRiskTolerance(dto.getRiskTolerance());
        existing.setUpdatedAt(Instant.now());
        existing.setCreatedAt(Instant.now());

        User updated = userRepository.save(existing);

        UserSpendingDTO spendingDTO = UserSpendingDTO.builder()
                .id(updated.getId())
                .monthlyIncome(updated.getMonthlyIncome())
                .monthlyExpense(updated.getMonthlyExpense())
                .savings(updated.getSavings())
                .investmentAvenues(updated.getInvestmentAvenues())
                .consent(updated.isConsent())
                .financialLiteracyScore(updated.getFinancialLiteracyScore())
                .riskTolerance(updated.getRiskTolerance())
                .build();
        userProducer.sendSpendingEvent(spendingDTO);
        return toProfileDTO(updated);
    }

    @Transactional
    public UserProfileDTO update(String id, UserProfileDTO dto) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        existing.setAge(dto.getAge());
        existing.setGender(dto.getGender());
        existing.setOccupation(dto.getOccupation());
        existing.setEmail(dto.getEmail());
        existing.setMonthlyIncome(dto.getMonthlyIncome());
        existing.setMonthlyExpense(dto.getMonthlyExpense());
        existing.setSavings(dto.getSavings());
        existing.setInvestmentAvenues(dto.getInvestmentAvenues());
        existing.setConsent(dto.isConsent());
        existing.setFinancialGoals(dto.getFinancialGoals());
        existing.setFinancialLiteracyScore(dto.getFinancialLiteracyScore());
        existing.setRiskTolerance(dto.getRiskTolerance());
        existing.setUpdatedAt(Instant.now());
        User updated = userRepository.save(existing);

        UserSpendingDTO spendingDTO = UserSpendingDTO.builder()
                .id(updated.getId())
                .monthlyIncome(updated.getMonthlyIncome())
                .monthlyExpense(updated.getMonthlyExpense())
                .savings(updated.getSavings())
                .investmentAvenues(updated.getInvestmentAvenues())
                .consent(updated.isConsent())
                .financialLiteracyScore(updated.getFinancialLiteracyScore())
                .riskTolerance(updated.getRiskTolerance())
                .build();
        userProducer.sendSpendingEvent(spendingDTO);
        return toProfileDTO(updated);
    }

    @Transactional(readOnly = true)
    public UserProfileDTO getById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return toProfileDTO(user);
    }

    @Transactional(readOnly = true)
    public List<UserProfileDTO> getAll() {
        return userRepository.findAll().stream()
                .map(this::toProfileDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
        userProducer.sendSpendingEvent(
                UserSpendingDTO.builder().id(id).build()
        );
    }

    private UserProfileDTO toProfileDTO(User u) {
        return UserProfileDTO.builder()
                .id(u.getId())
                .age(u.getAge())
                .gender(u.getGender())
                .occupation(u.getOccupation())
                .email(u.getEmail())
                .monthlyIncome(u.getMonthlyIncome())
                .monthlyExpense(u.getMonthlyExpense())
                .savings(u.getSavings())
                .investmentAvenues(u.getInvestmentAvenues())
                .financialGoals(u.getFinancialGoals())
                .financialLiteracyScore(u.getFinancialLiteracyScore())
                .riskTolerance(u.getRiskTolerance())
                .build();
    }

    public userRes signup(userRes userRes) {
        userRepository.findByEmail(userRes.getEmail()).ifPresent(e -> {
            throw new ResourceNotFoundException("Email already signed up");
        });

        User user = new User();
        user.setEmail(userRes.getEmail());
        user.setName(userRes.getName());
        user.setPassword(passwordEncoder.encode(userRes.getPassword())); // Important to encode password

        User savedUser = userRepository.save(user);

        return new userRes(savedUser.getEmail(), savedUser.getName(), savedUser.getId()); // Return ID
    }


    public userRes signin(userRes userRes) {
        User user = userRepository.findByEmail(userRes.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Email not found"));

        if (!passwordEncoder.matches(userRes.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        return new userRes(user.getEmail(), user.getName(), user.getId()); // Return ID too
    }


}