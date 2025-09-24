package com.vti.repository;

import com.vti.entity.Reservation;
import com.vti.entity.Tables;
import com.vti.entity.User;
import com.vti.entity.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
    long countByStatusIn(List<ReservationStatus> statuses);
    Optional<Reservation> findByTableAndReservationDateTime(Tables table, LocalDateTime reservationDateTime);
    boolean existsByTableAndReservationDateTime(Tables table, LocalDateTime reservationDateTime);
}
