package com.vti.repository;

import com.vti.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query("SELECT new map(oi.menuItem.name as name, SUM(oi.quantity) as quantity) " +
            "FROM OrderItem oi " +
            "GROUP BY oi.menuItem.id, oi.menuItem.name " +
            "ORDER BY SUM(oi.quantity) DESC")
    List<Map<String, Object>> findTopSellingDishes();

}
