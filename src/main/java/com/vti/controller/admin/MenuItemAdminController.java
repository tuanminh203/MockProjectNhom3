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
@RequestMapping("/api/v1/admin/menu-items")
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
public class MenuItemAdminController {
    private final MenuItemService menuItemService;

    //Thêm món ăn mới
    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@ModelAttribute MenuItemRequest request) throws IOException {
        MenuItem createdMenuItem = menuItemService.createMenuItem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMenuItem);
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
