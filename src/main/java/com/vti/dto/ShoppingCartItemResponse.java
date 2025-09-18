package com.vti.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ShoppingCartItemResponse {
    private Long id;
    private Integer quantity;
    private BigDecimal priceAtPurchase;
    private MenuItemResponse menuItem;
}
