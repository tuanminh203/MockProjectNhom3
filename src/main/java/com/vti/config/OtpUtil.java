package com.vti.config;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class OtpUtil {
    public String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100_000 + random.nextInt(900_000);
        return String.valueOf(otp);
    }
}
