package com.vti.service;

import com.vti.dto.ReservationRequest;
import com.vti.dto.ReservationResponse;
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
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // Lấy danh sách các bàn đang trống
    public List<Tables> getAvailableTables() {
        return tableRepository.findByStatus(TableStatus.AVAILABLE);
    }

    // Đặt bàn mới
    @Transactional
    public ReservationResponse makeReservation(Long tableId, ReservationRequest request) {
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

        Reservation savedReservation = reservationRepository.save(reservation);

        // Chuyển đổi từ entity Reservation sang DTO ReservationResponse
        return modelMapper.map(savedReservation, ReservationResponse.class);
    }

    // Lấy lịch sử đặt bàn của người dùng hiện tại
    public List<ReservationResponse> getUserReservations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new AppException("Người dùng không tồn tại.", HttpStatus.NOT_FOUND));

        List<Reservation> userReservations = reservationRepository.findByUser(currentUser);

        return userReservations.stream()
                .map(reservation -> modelMapper.map(reservation, ReservationResponse.class))
                .collect(Collectors.toList());
    }

    // Lấy toàn bộ danh sách đặt bàn (dành cho Admin/Manager)
    public List<ReservationResponse> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();

        // Sử dụng Java Stream để lặp và ánh xạ từng đối tượng
        return reservations.stream()
                .map(reservation -> modelMapper.map(reservation, ReservationResponse.class))
                .collect(Collectors.toList());
    }

    // Đếm số lượng đơn đặt bàn đã được xác nhận và hoàn thành
    public long getConfirmedAndCompletedReservationsCount() {
        // Tạo một danh sách các trạng thái cần đếm
        List<ReservationStatus> statuses = Arrays.asList(
                ReservationStatus.CONFIRMED,
                ReservationStatus.COMPLETED
        );
        return reservationRepository.countByStatusIn(statuses);
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
    public ReservationResponse cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new AppException("Đơn đặt bàn không tồn tại.", HttpStatus.NOT_FOUND));

        if (reservation.getStatus() == ReservationStatus.COMPLETED || reservation.getReservationDateTime().isBefore(LocalDateTime.now())) {
            throw new AppException("Không thể hủy đơn đặt bàn đã hoàn thành hoặc quá hạn.", HttpStatus.BAD_REQUEST);
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservation.getTable().setStatus(TableStatus.AVAILABLE);

        Reservation updatedReservation = reservationRepository.save(reservation);

        return modelMapper.map(updatedReservation, ReservationResponse.class);
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
