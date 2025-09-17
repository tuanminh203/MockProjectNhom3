package com.vti.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationRequest {
    private LocalDateTime reservationDateTime;
    private Integer numPeople;
}
