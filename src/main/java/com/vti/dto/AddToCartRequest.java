package com.vti.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddToCartRequest {
    @NotNull
    private Long menuItemId;
    @Min(1)
    private Integer quantity;
}
