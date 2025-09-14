package com.vti.service;

import com.vti.config.OtpUtil;
import com.vti.dto.ForgotPasswordRequest;
import com.vti.entity.OTP;
import com.vti.entity.User;
import com.vti.entity.enums.OTPType;
import com.vti.entity.enums.UserStatus;
import com.vti.exception.AppException;
import com.vti.repository.OTPRepository;
import com.vti.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OTPRepository otpRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final OtpUtil otpUtil;

    @Transactional
    public void generateAndSendOtp(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException("Không tìm thấy người dùng với email đã cho.", HttpStatus.NOT_FOUND));

        otpRepository.deleteByEmailAndType(request.getEmail(), OTPType.PASSWORD_RESET);

        String otpCode = otpUtil.generateOtp();
        OTP otp = new OTP();
        otp.setEmail(request.getEmail());
        otp.setCode(otpCode);
        otp.setExpirationTime(LocalDateTime.now().plusMinutes(5));
        otp.setType(OTPType.PASSWORD_RESET);
        otpRepository.save(otp);

        String subject = "Mã OTP khôi phục mật khẩu của bạn";
        String text = "Chào bạn,\n\nMã OTP của bạn là: " + otpCode + "\nMã này sẽ hết hạn trong 5 phút.\n\nTrân trọng,\nĐội ngũ hỗ trợ.";
        emailService.sendEmail(request.getEmail(), subject, text);

    }

    @Transactional
    public void validateAndResetPassword(String email, String otp, String newPassword) {
        OTP otpEntity = otpRepository.findByEmailAndCodeAndType(email, otp, OTPType.PASSWORD_RESET)
                .orElseThrow(() -> new AppException("Mã OTP không hợp lệ.", HttpStatus.BAD_REQUEST));

        if (otpEntity.getExpirationTime().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otpEntity);
            throw new AppException("Mã OTP đã hết hạn.", HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Không tìm thấy người dùng.", HttpStatus.NOT_FOUND));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        otpRepository.delete(otpEntity);
    }

    @Transactional
    public void generateAndSendRegistrationOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Email không tồn tại.", HttpStatus.NOT_FOUND));

        otpRepository.deleteByEmailAndType(email, OTPType.ACCOUNT_VERIFICATION);

        String otpCode = otpUtil.generateOtp();
        OTP otp = new OTP();
        otp.setEmail(email);
        otp.setCode(otpCode);
        otp.setExpirationTime(LocalDateTime.now().plusMinutes(5));
        otp.setType(OTPType.ACCOUNT_VERIFICATION);
        otpRepository.save(otp);

        String subject = "Xác nhận tài khoản của bạn";
        String text = "Chào bạn,\n\nMã OTP để kích hoạt tài khoản của bạn là: " + otpCode + "\nMã này sẽ hết hạn trong 5 phút.\n\nTrân trọng,\nĐội ngũ hỗ trợ.";
        emailService.sendEmail(email, subject, text);
    }

    @Transactional
    public void validateAndEnableUser(String email, String otp) {
        OTP otpEntity = otpRepository.findByEmailAndCodeAndType(email, otp, OTPType.ACCOUNT_VERIFICATION)
                .orElseThrow(() -> new AppException("Mã OTP không hợp lệ.", HttpStatus.BAD_REQUEST));

        if (otpEntity.getExpirationTime().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otpEntity);
            throw new AppException("Mã OTP đã hết hạn.", HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Không tìm thấy người dùng.", HttpStatus.NOT_FOUND));

        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        otpRepository.delete(otpEntity);
    }

}
