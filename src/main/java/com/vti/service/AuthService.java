package com.vti.service;

import com.vti.config.jwt.JwtUtil;
import com.vti.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public String authenticateAndGetJwt(LoginRequest loginRequest){
        // Xác thực người dùng bằng username và password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        // Lấy đối tượng UserDetails từ Authentication
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Dùng JwtUtil để tạo token
        return jwtUtil.generateToken(userDetails);
    }
}
