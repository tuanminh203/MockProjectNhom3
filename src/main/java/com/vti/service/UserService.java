package com.vti.service;

import com.vti.dto.RegistrationRequest;
import com.vti.entity.User;
import com.vti.entity.enums.UserRole;
import com.vti.entity.enums.UserStatus;
import com.vti.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;

    @Transactional
    public void registerUser(RegistrationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username đã tồn tại.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại.");

        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullname(request.getFullName());
        user.setRole(UserRole.CUSTOMER);
        user.setStatus(UserStatus.PENDING_VERIFICATION);
        userRepository.save(user);

        otpService.generateAndSendRegistrationOtp(user.getEmail());
    }
}
