package com.vti.controller.customer;

import com.vti.dto.ReservationRequest;
import com.vti.dto.ReservationResponse;
import com.vti.entity.Tables;
import com.vti.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    //Lấy danh sách bàn trống done
    @GetMapping("/tables/available")
    public ResponseEntity<?> getAvailableTables() {
        List<Tables> availableTables = reservationService.getAvailableTables();
        return ResponseEntity.ok(availableTables);
    }

    //Đặt bàn mới done
    @PostMapping("/make/{tableId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> makeReservation(@PathVariable Long tableId,
                                             @RequestBody ReservationRequest request) {
        ReservationResponse newReservation = reservationService.makeReservation(tableId, request);
        return ResponseEntity.ok(newReservation);
    }

    //Xem lịch sử đặt bàn done
    @GetMapping("/history")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> getUserReservations() {
        List<ReservationResponse> userReservations = reservationService.getUserReservations();
        return ResponseEntity.ok(userReservations);
    }

    //Hủy đơn đặt bàn done
    @PutMapping("/cancel/{reservationId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> cancelReservation(@PathVariable Long reservationId) {
        ReservationResponse updatedReservation = reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok(updatedReservation);
    }
}
