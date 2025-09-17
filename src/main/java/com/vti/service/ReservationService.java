package com.vti.service;

import com.vti.dto.ReservationRequest;
import com.vti.entity.Reservation;
import com.vti.entity.Tables;
import com.vti.entity.User;
import com.vti.entity.enums.ReservationStatus;
import com.vti.entity.enums.TableStatus;
import com.vti.exception.AppException;
import com.vti.repository.ReservationRepository;
import com.vti.repository.TableRepository;
import com.vti.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;
    private final UserRepository userRepository;

    // Lấy danh sách các bàn đang trống
    public List<Tables> getAvailableTables() {
        return tableRepository.findByStatus(TableStatus.AVAILABLE);
    }

    // Đặt bàn mới
    @Transactional
    public Reservation makeReservation(Long tableId, ReservationRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new AppException("Người dùng không tồn tại.", HttpStatus.NOT_FOUND));

        Tables selectedTable = tableRepository.findById(tableId)
                .orElseThrow(() -> new AppException("Bàn không tồn tại.", HttpStatus.NOT_FOUND));

        if (selectedTable.getStatus() != TableStatus.AVAILABLE) {
            throw new AppException("Bàn này không có sẵn để đặt.", HttpStatus.BAD_REQUEST);
        }

        if (request.getNumPeople() > selectedTable.getCapacity()) {
            throw new AppException("Số lượng người vượt quá sức chứa của bàn.", HttpStatus.BAD_REQUEST);
        }

        selectedTable.setStatus(TableStatus.RESERVED);
        tableRepository.save(selectedTable);

        Reservation reservation = new Reservation();
        reservation.setUser(currentUser);
        reservation.setTable(selectedTable);
        reservation.setReservationDateTime(request.getReservationDateTime());
        reservation.setNumPeople(request.getNumPeople());
        reservation.setStatus(ReservationStatus.PENDING);

        return reservationRepository.save(reservation);
    }

    // Lấy lịch sử đặt bàn của người dùng hiện tại
    public List<Reservation> getUserReservations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new AppException("Người dùng không tồn tại.", HttpStatus.NOT_FOUND));

        return reservationRepository.findByUser(currentUser);
    }

    // Lấy toàn bộ danh sách đặt bàn (dành cho Admin/Manager)
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Manager/Admin xác nhận đơn đặt bàn
    @Transactional
    public Reservation confirmReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new AppException("Đơn đặt bàn không tồn tại.", HttpStatus.NOT_FOUND));

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new AppException("Không thể xác nhận đơn đặt bàn ở trạng thái hiện tại.", HttpStatus.BAD_REQUEST);
        }

        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservation.getTable().setStatus(TableStatus.RESERVED);

        return reservationRepository.save(reservation);
    }

    // Hủy đơn đặt bàn
    @Transactional
    public Reservation cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new AppException("Đơn đặt bàn không tồn tại.", HttpStatus.NOT_FOUND));

        if (reservation.getStatus() == ReservationStatus.COMPLETED || reservation.getReservationDateTime().isBefore(LocalDateTime.now())) {
            throw new AppException("Không thể hủy đơn đặt bàn đã hoàn thành hoặc quá hạn.", HttpStatus.BAD_REQUEST);
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservation.getTable().setStatus(TableStatus.AVAILABLE);

        return reservationRepository.save(reservation);
    }

    // Manager/Admin hoàn thành đơn đặt bàn
    @Transactional
    public Reservation completeReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new AppException("Đơn đặt bàn không tồn tại.", HttpStatus.NOT_FOUND));

        if (reservation.getStatus() != ReservationStatus.CONFIRMED) {
            throw new AppException("Không thể hoàn thành đơn đặt bàn chưa được xác nhận.", HttpStatus.BAD_REQUEST);
        }

        reservation.setStatus(ReservationStatus.COMPLETED);
        reservation.getTable().setStatus(TableStatus.OCCUPIED);
        return reservationRepository.save(reservation);
    }

}
