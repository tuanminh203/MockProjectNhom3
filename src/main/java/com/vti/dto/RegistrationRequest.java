package com.vti.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String address;
    private LocalDate birthDate;
}
