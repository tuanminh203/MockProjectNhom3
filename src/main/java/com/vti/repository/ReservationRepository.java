package com.vti.repository;

import com.vti.entity.Reservation;
import com.vti.entity.Tables;
import com.vti.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
    Optional<Reservation> findByTableAndReservationDateTime(Tables table, LocalDateTime reservationDateTime);
    boolean existsByTableAndReservationDateTime(Tables table, LocalDateTime reservationDateTime);
}
