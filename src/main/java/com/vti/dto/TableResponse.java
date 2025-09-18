package com.vti.dto;

import com.vti.entity.enums.TableStatus;
import lombok.Data;

@Data
public class TableResponse {
    private Long id;
    private String tableNumber;
    private Integer capacity;
    private TableStatus status;
}
