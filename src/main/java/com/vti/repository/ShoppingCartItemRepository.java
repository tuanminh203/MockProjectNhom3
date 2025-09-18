package com.vti.repository;

import com.vti.entity.MenuItem;
import com.vti.entity.ShoppingCart;
import com.vti.entity.ShoppingCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Long> {
    Optional<ShoppingCartItem> findByShoppingCartAndMenuItem(ShoppingCart shoppingCart,
                                                             MenuItem menuItem);
}
