package com.vti.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
@Data
public class AppException extends RuntimeException{
    private HttpStatus status;
    private String message;

    public AppException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
