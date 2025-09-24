package com.vti.controller.admin;

import com.vti.dto.ReservationResponse;
import com.vti.entity.Reservation;
import com.vti.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/reservations")
@RequiredArgsConstructor
//@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
public class ReservationAdminController {
    private final ReservationService reservationService;

    // Endpoint cho Admin/Manager: Xem tất cả đơn đặt bàn
    @GetMapping("/all")
    public ResponseEntity<?> getAllReservations() {
        List<ReservationResponse> allReservations = reservationService.getAllReservations();
        return ResponseEntity.ok(allReservations);
    }

    // Đếm số lượng đơn đặt bàn đã xác nhận và hoàn thành
    @GetMapping("/confirmed-completed-count")
    public Map<String, Long> getConfirmedCompletedCount() {
        long count = reservationService.getConfirmedAndCompletedReservationsCount();
        // Trả về một Map với key là "count" và value là số lượng
        return Collections.singletonMap("count", count);
    }

    //Xác nhận đơn đặt bàn
    @PutMapping("/confirm/{reservationId}")
    public ResponseEntity<?> confirmReservation(@PathVariable Long reservationId) {
        Reservation updatedReservation = reservationService.confirmReservation(reservationId);
        return ResponseEntity.ok(updatedReservation);
    }

    // Hủy đơn đặt bàn
    @PutMapping("/cancel/{reservationId}")
    public ResponseEntity<?> cancelReservation(@PathVariable Long reservationId) {
        ReservationResponse updatedReservation = reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok(updatedReservation);
    }

    //Hoàn thành đơn đặt bàn
    @PutMapping("/complete/{reservationId}")
    public ResponseEntity<?> completeReservation(@PathVariable Long reservationId) {
        Reservation updatedReservation = reservationService.completeReservation(reservationId);
        return ResponseEntity.ok(updatedReservation);
    }
}
