package com.vti.controller.customer;

import com.vti.dto.OrderResponse;
import com.vti.service.CartAndOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CUSTOMER')")
public class OrderController {
    private final CartAndOrderService cartAndOrderService;

    //Đặt đơn hàng mới từ giỏ hàng done
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder() {
        OrderResponse newOrder = cartAndOrderService.placeOrderFromCart();
        return ResponseEntity.status(HttpStatus.CREATED).body(newOrder);
    }

    //Xem danh sách đơn hàng đã đặt
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders() {
        List<OrderResponse> orders = cartAndOrderService.getUserOrders();
        return ResponseEntity.ok(orders);
    }

    //Xem chi tiết một đơn hàng done
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderDetails(@PathVariable Long id) {
        OrderResponse orderDetails = cartAndOrderService.getOrderDetails(id);
        return ResponseEntity.ok(orderDetails);
    }

    //Hủy đơn hàng done
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponse> cancelOrder(@PathVariable Long orderId) {
        OrderResponse canceledOrder = cartAndOrderService.cancelOrder(orderId);
        return ResponseEntity.ok(canceledOrder);
    }

}
