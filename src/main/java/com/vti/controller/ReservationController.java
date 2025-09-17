package com.vti.controller;

import com.vti.dto.ReservationRequest;
import com.vti.entity.Reservation;
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

    // Endpoint công khai: Lấy danh sách bàn trống
    @GetMapping("/tables/available")
    public ResponseEntity<?> getAvailableTables() {
        List<Tables> availableTables = reservationService.getAvailableTables();
        return ResponseEntity.ok(availableTables);
    }

    // Endpoint cho khách hàng: Đặt bàn mới
    @PostMapping("/make/{tableId}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> makeReservation(@PathVariable Long tableId,
                                                       @RequestBody ReservationRequest request) {
        Reservation newReservation = reservationService.makeReservation(tableId, request);
        return ResponseEntity.ok(newReservation);
    }

    // Endpoint cho khách hàng: Xem lịch sử đặt bàn
    @GetMapping("/history")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> getUserReservations() {
        List<Reservation> userReservations = reservationService.getUserReservations();
        return ResponseEntity.ok(userReservations);
    }

    // Endpoint cho Admin/Manager: Xem tất cả đơn đặt bàn
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MANAGER')")
    public ResponseEntity<?> getAllReservations() {
        List<Reservation> allReservations = reservationService.getAllReservations();
        return ResponseEntity.ok(allReservations);
    }

    // Endpoint cho Admin/Manager: Xác nhận đơn đặt bàn
    @PutMapping("/confirm/{reservationId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MANAGER')")
    public ResponseEntity<?> confirmReservation(@PathVariable Long reservationId) {
        Reservation updatedReservation = reservationService.confirmReservation(reservationId);
        return ResponseEntity.ok(updatedReservation);
    }

    // Endpoint cho khách hàng, Admin/Manager: Hủy đơn đặt bàn
    @PutMapping("/cancel/{reservationId}")
    @PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN') or hasAuthority('MANAGER')")
    public ResponseEntity<?> cancelReservation(@PathVariable Long reservationId) {
        Reservation updatedReservation = reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok(updatedReservation);
    }

    // Endpoint cho Admin/Manager: Hoàn thành đơn đặt bàn
    @PutMapping("/complete/{reservationId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MANAGER')")
    public ResponseEntity<?> completeReservation(@PathVariable Long reservationId) {
        Reservation updatedReservation = reservationService.completeReservation(reservationId);
        return ResponseEntity.ok(updatedReservation);
    }
}
