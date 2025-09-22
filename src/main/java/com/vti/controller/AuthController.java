package com.vti.controller;

import com.vti.dto.*;
import com.vti.service.AuthService;
import com.vti.service.OtpService;
import com.vti.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final OtpService otpService;

    //done
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String jwt = authService.authenticateAndGetJwt(loginRequest);
        return ResponseEntity.ok(jwt);
    }

    //done
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request) {
        userService.registerUser(request);
        return ResponseEntity.ok("Người dùng đã được đăng ký. Vui lòng kiểm tra email để xác thực tài khoản.");
    }

    //done
    @PostMapping("/confirm-registration")
    public ResponseEntity<String> confirmRegistration(@RequestBody VerifyOtpRequest request) {
        otpService.validateAndEnableUser(request.getEmail(), request.getOtp());
        return ResponseEntity.ok("Tài khoản đã được xác thực thành công.");
    }

    //done
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        otpService.generateAndSendOtp(request);
        return ResponseEntity.ok("Mã OTP đã được gửi đến email của bạn.");
    }

    //done
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        otpService.validateAndResetPassword(request.getEmail(), request.getOtp(), request.getNewPassword());
        return ResponseEntity.ok("Mật khẩu đã được đặt lại thành công.");
    }

}
