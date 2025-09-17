package com.vti.config;

import com.vti.config.jwt.JwtFilter;
import com.vti.service.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // Các API công khai, không cần xác thực
                        .requestMatchers("/api/v1/auth/**", "/error", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/api/v1/public/**").permitAll()
                        .requestMatchers("/api/v1/menu/**").permitAll()

                        // API chỉ cho người dùng đã đăng nhập (cơ bản)
                        .requestMatchers("/api/v1/reservations/tables/available").authenticated()
                        .requestMatchers("/api/v1/reservations/make/**").authenticated()
                        .requestMatchers("/api/v1/reservations/cancel/**").authenticated()

                        // API chỉ cho Manager/Admin
                        .requestMatchers("/api/v1/reservations/confirm/**").hasAnyAuthority("MANAGER", "ADMIN")
                        .requestMatchers("/api/v1/reservations/complete/**").hasAnyAuthority("MANAGER", "ADMIN")

                        // Các API yêu cầu xác thực và phân quyền
//                        .requestMatchers("/api/v1/admin/**").hasAuthority("ROLE_ADMIN")
//                        .requestMatchers("/api/v1/manager/**").hasAuthority("ROLE_MANAGER")
//                        .requestMatchers("/api/v1/customer/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN", "ROLE_MANAGER")

                        // Các yêu cầu khác yêu cầu xác thực
//                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}