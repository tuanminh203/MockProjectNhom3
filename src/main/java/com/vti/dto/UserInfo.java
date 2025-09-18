package com.vti.dto;

import lombok.Data;

@Data
public class UserInfo {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
}
