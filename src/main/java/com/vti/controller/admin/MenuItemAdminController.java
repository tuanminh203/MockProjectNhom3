package com.vti.controller.admin;

import com.vti.dto.MenuItemRequest;
import com.vti.entity.MenuItem;
import com.vti.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/public/menu-items")
@RequiredArgsConstructor
public class MenuItemAdminController {
    private final MenuItemService menuItemService;

    //Thêm món ăn mới
    @PostMapping
    public ResponseEntity<?> createMenuItem(@ModelAttribute MenuItemRequest request) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(menuItemService.createMenuItem(request));
    }

    //Cập nhật thông tin món ăn
    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @ModelAttribute MenuItemRequest request) throws IOException {
        MenuItem updatedMenuItem = menuItemService.updateMenuItem(id, request);
        return ResponseEntity.ok(updatedMenuItem);
    }

    //Xóa món ăn
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}
