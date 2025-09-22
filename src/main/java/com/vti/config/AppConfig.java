package com.vti.config;

import com.vti.dto.*;
import com.vti.entity.MenuItem;
import com.vti.entity.Reservation;
import com.vti.entity.Tables;
import com.vti.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.createTypeMap(Tables.class, TableResponse.class);

        // Ánh xạ từ User entity sang UserInfo DTO
        modelMapper.createTypeMap(User.class, UserInfo.class);

        // Ánh xạ từ Reservation entity sang ReservationResponse DTO
        modelMapper.createTypeMap(Reservation.class, ReservationResponse.class);

        modelMapper.createTypeMap(MenuItem.class, MenuItemRequest.class);

        return modelMapper;
    }

}
