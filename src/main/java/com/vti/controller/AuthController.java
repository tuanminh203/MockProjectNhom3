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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String jwt = authService.authenticateAndGetJwt(loginRequest);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request) {
        userService.registerUser(request);
        return ResponseEntity.ok("Người dùng đã được đăng ký. Vui lòng kiểm tra email để xác thực tài khoản.");
    }

    @PostMapping("/confirm-registration/{email}")
    public ResponseEntity<String> confirmRegistration(@PathVariable String email,
                                                      @RequestBody VerifyOtpRequest request) {
        otpService.validateAndEnableUser(email, request.getOtp());
        return ResponseEntity.ok("Tài khoản đã được xác thực thành công.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        otpService.generateAndSendOtp(request);
        return ResponseEntity.ok("Mã OTP đã được gửi đến email của bạn.");
    }

    @PostMapping("/reset-password/{email}")
    public ResponseEntity<String> resetPassword(@PathVariable String email,
                                                @RequestBody ResetPasswordRequest request) {
        otpService.validateAndResetPassword(email, request.getOtp(), request.getNewPassword());
        return ResponseEntity.ok("Mật khẩu đã được đặt lại thành công.");
    }

}
