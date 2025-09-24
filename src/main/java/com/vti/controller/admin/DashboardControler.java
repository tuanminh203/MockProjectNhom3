package com.vti.controller.admin;

import com.vti.service.CartAndOrderService;
import com.vti.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardControler {
    private final CartAndOrderService cartAndOrderService;
    private final ReservationService reservationService;

    @GetMapping("/orders-count")
    public Map<String, Long> getOrdersCount() {
        long value = cartAndOrderService.getConfirmedOrdersCount();
        return Collections.singletonMap("value", value);
    }

    @GetMapping("/confirmed-completed-count")
    public Map<String, Long> getConfirmedCompletedCount() {
        long count = reservationService.getConfirmedAndCompletedReservationsCount();
        return Collections.singletonMap("count", count);
    }

    @GetMapping("/top-selling-dishes")
    public ResponseEntity<List<Map<String, Object>>> getTopSellingDishes() {
        List<Map<String, Object>> topDishes = cartAndOrderService.getTopSellingDishes();
        return ResponseEntity.ok(topDishes);
    }
}
