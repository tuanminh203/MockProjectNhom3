package com.vti.service;

import com.vti.dto.AddToCartRequest;
import com.vti.dto.OrderResponse;
import com.vti.dto.ShoppingCartItemResponse;
import com.vti.entity.*;
import com.vti.exception.AppException;
import com.vti.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartAndOrderService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final ShoppingCartItemRepository shoppingCartItemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new AppException("Người dùng không tồn tại.", HttpStatus.NOT_FOUND));
    }

    private ShoppingCart getOrCreateUserCart(User user) {
        return shoppingCartRepository.findByUser(user)
                .orElseGet(() -> {
                    ShoppingCart newCart = new ShoppingCart();
                    newCart.setUser(user);
                    return shoppingCartRepository.save(newCart);
                });
    }

    // Xem giỏ hàng
    public List<ShoppingCartItemResponse> getCart() {
        User currentUser = getCurrentUser();
        ShoppingCart cart = getOrCreateUserCart(currentUser);
        List<ShoppingCartItem> cartItems = cart.getItems();
        return cartItems.stream()
                .map(item -> modelMapper.map(item, ShoppingCartItemResponse.class))
                .collect(Collectors.toList());
    }

    // Thêm món vào giỏ hàng
    @Transactional
    public List<ShoppingCartItemResponse> addToCart(AddToCartRequest request) {
        User currentUser = getCurrentUser();
        ShoppingCart cart = getOrCreateUserCart(currentUser);
        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId())
                .orElseThrow(() -> new AppException("Món ăn không tồn tại.", HttpStatus.NOT_FOUND));

        Optional<ShoppingCartItem> existingItem = shoppingCartItemRepository.findByShoppingCartAndMenuItem(cart, menuItem);
        if (existingItem.isPresent()) {
            ShoppingCartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            shoppingCartItemRepository.save(item);
        } else {
            ShoppingCartItem newItem = new ShoppingCartItem();
            newItem.setShoppingCart(cart);
            newItem.setMenuItem(menuItem);
            newItem.setQuantity(request.getQuantity());
            newItem.setPriceAtPurchase(menuItem.getPrice());
            shoppingCartItemRepository.save(newItem);
        }
        return getCart();
    }

    // Cập nhật số lượng món trong giỏ hàng
    @Transactional
    public List<ShoppingCartItemResponse> updateCartItemQuantity(Long menuItemId, Integer quantity) {
        User currentUser = getCurrentUser();
        ShoppingCart cart = getOrCreateUserCart(currentUser);
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new AppException("Món ăn không tồn tại.", HttpStatus.NOT_FOUND));

        ShoppingCartItem item = shoppingCartItemRepository.findByShoppingCartAndMenuItem(cart, menuItem)
                .orElseThrow(() -> new AppException("Món ăn không có trong giỏ hàng.", HttpStatus.NOT_FOUND));

        if (quantity <= 0) {
            shoppingCartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            shoppingCartItemRepository.save(item);
        }
        return getCart();
    }

    // Xóa món khỏi giỏ hàng
    @Transactional
    public void removeCartItem(Long menuItemId) {
        User currentUser = getCurrentUser();
        ShoppingCart cart = getOrCreateUserCart(currentUser);
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new AppException("Món ăn không tồn tại.", HttpStatus.NOT_FOUND));

        ShoppingCartItem item = shoppingCartItemRepository.findByShoppingCartAndMenuItem(cart, menuItem)
                .orElseThrow(() -> new AppException("Món ăn không có trong giỏ hàng.", HttpStatus.NOT_FOUND));

        shoppingCartItemRepository.delete(item);
    }

    // Đặt đơn hàng mới từ giỏ hàng
    @Transactional
    public OrderResponse placeOrderFromCart() {
        User currentUser = getCurrentUser();
        ShoppingCart cart = shoppingCartRepository.findByUser(currentUser)
                .orElseThrow(() -> new AppException("Giỏ hàng của bạn đang trống.", HttpStatus.BAD_REQUEST));

        List<ShoppingCartItem> cartItems = cart.getItems();
        if (cartItems.isEmpty()) {
            throw new AppException("Giỏ hàng của bạn đang trống, không thể đặt hàng.", HttpStatus.BAD_REQUEST);
        }

        // Tạo đơn hàng mới
        Order newOrder = new Order();
        newOrder.setUser(currentUser);
        newOrder.setOrderDateTime(LocalDateTime.now());
        BigDecimal total = BigDecimal.ZERO;

        for (ShoppingCartItem cartItem : cartItems) {
            total = total.add(cartItem.getPriceAtPurchase().multiply(new BigDecimal(cartItem.getQuantity())));
        }
        newOrder.setTotalPrice(total);
        orderRepository.save(newOrder);

        // Chuyển các món từ giỏ hàng sang đơn hàng
        for (ShoppingCartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(newOrder);
            orderItem.setMenuItem(cartItem.getMenuItem());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceAtPurchase(cartItem.getPriceAtPurchase());
            orderItemRepository.save(orderItem);
        }

        // Xóa tất cả các món trong giỏ hàng
        shoppingCartItemRepository.deleteAll(cartItems);
        cart.getItems().clear();
        shoppingCartRepository.save(cart);

        return modelMapper.map(newOrder, OrderResponse.class);
    }

    // Xem danh sách đơn hàng đã đặt
    public List<OrderResponse> getUserOrders() {
        User currentUser = getCurrentUser();
        List<Order> orders = orderRepository.findByUserOrderByOrderDateTimeDesc(currentUser);
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderResponse.class))
                .collect(Collectors.toList());
    }

    // Xem chi tiết một đơn hàng
    public OrderResponse getOrderDetails(Long orderId) {
        User currentUser = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Đơn hàng không tồn tại.", HttpStatus.NOT_FOUND));

        if (!order.getUser().equals(currentUser)) {
            throw new AppException("Bạn không có quyền xem đơn hàng này.", HttpStatus.FORBIDDEN);
        }

        return modelMapper.map(order, OrderResponse.class);
    }
}
