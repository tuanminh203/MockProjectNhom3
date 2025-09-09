package com.vti.dto.login;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
}
