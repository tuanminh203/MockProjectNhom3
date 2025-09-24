package com.vti.repository;

import com.vti.entity.Order;
import com.vti.entity.User;
import com.vti.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByOrderDateTimeDesc(User user);
    long countByStatus(OrderStatus status);
}
