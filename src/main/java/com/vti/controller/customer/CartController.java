package com.vti.controller.customer;

import com.vti.dto.AddToCartRequest;
import com.vti.dto.ShoppingCartItemResponse;
import com.vti.service.CartAndOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('CUSTOMER')")
public class CartController {
    private final CartAndOrderService cartAndOrderService;

    //Xem giỏ hàng
    @GetMapping
    public ResponseEntity<List<ShoppingCartItemResponse>> getCart() {
        return ResponseEntity.ok(cartAndOrderService.getCart());
    }

    //Thêm món vào giỏ hàng
    @PostMapping
    public ResponseEntity<List<ShoppingCartItemResponse>> addToCart(@RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(cartAndOrderService.addToCart(request));
    }

    //Cập nhật số lượng món
    @PutMapping("/{menuItemId}")
    public ResponseEntity<List<ShoppingCartItemResponse>> updateCartItemQuantity(@PathVariable Long menuItemId, @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartAndOrderService.updateCartItemQuantity(menuItemId, quantity));
    }

    //Xóa món khỏi giỏ hàng
    @DeleteMapping("/{menuItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long menuItemId) {
        cartAndOrderService.removeCartItem(menuItemId);
        return ResponseEntity.noContent().build();
    }
}
