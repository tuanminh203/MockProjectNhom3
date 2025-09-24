package com.vti.dto;

import com.vti.entity.enums.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private LocalDateTime orderDateTime;
    private OrderStatus status;
    private BigDecimal totalPrice;
    private List<OrderItemResponse> orderItems;
}
