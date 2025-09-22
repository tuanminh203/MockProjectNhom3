package com.vti.service;

import com.vti.dto.MenuItemRequest;
import com.vti.dto.MenuItemResponse;
import com.vti.entity.Category;
import com.vti.entity.MenuItem;
import com.vti.exception.AppException;
import com.vti.repository.CategoryRepository;
import com.vti.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MenuItemService {
    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public List<MenuItemResponse> getAllMenuItems() {
        List<MenuItemResponse> responses = new ArrayList<>();
        List<MenuItem> menuItems = menuItemRepository.findAll();
        for (MenuItem menuItem : menuItems) {
            MenuItemResponse response = modelMapper.map(menuItem, MenuItemResponse.class);
            responses.add(response);
        }
        return responses;
    }

    // Lấy một món ăn theo ID
    public MenuItemResponse getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new AppException("Món ăn không tồn tại.", HttpStatus.NOT_FOUND));
        return modelMapper.map(menuItem, MenuItemResponse.class);
    }

    // Thêm món ăn mới
    public MenuItem createMenuItem(MenuItemRequest request) throws IOException {

        String imageUrl = processAndSaveImage(request.getImageFile());
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException("Category không tồn tại.", HttpStatus.NOT_FOUND));

        MenuItem menuItem = new MenuItem();
        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(category);
        menuItem.setImageUrl(imageUrl);

        return menuItemRepository.save(menuItem);
    }

    // Cập nhật thông tin món ăn
    public MenuItem updateMenuItem(Long id, MenuItemRequest request) throws IOException {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new AppException("Món ăn không tồn tại.", HttpStatus.NOT_FOUND));

        // Cập nhật các trường
        existingMenuItem.setName(request.getName());
        existingMenuItem.setDescription(request.getDescription());
        existingMenuItem.setPrice(request.getPrice());

        // Cập nhật Category nếu có thay đổi
        if (request.getCategoryId() != null && !request.getCategoryId().equals(existingMenuItem.getCategory().getId())) {
            Category newCategory = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException("Category không tồn tại.", HttpStatus.NOT_FOUND));
            existingMenuItem.setCategory(newCategory);
        }

        // Cập nhật ảnh nếu có tệp mới được tải lên
        if (request.getImageFile() != null && !request.getImageFile().isEmpty()) {
            String newImageUrl = processAndSaveImage(request.getImageFile());
            existingMenuItem.setImageUrl(newImageUrl);
        }

        return menuItemRepository.save(existingMenuItem);
    }

    // Xóa món ăn
    public void deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new AppException("Món ăn không tồn tại.", HttpStatus.NOT_FOUND);
        }
        menuItemRepository.deleteById(id);
    }

    // Phương thức nội bộ để xử lý và lưu ảnh
    private String processAndSaveImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFileName = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        String newFileName = UUID.randomUUID().toString() + fileExtension;
        Path filePath = uploadPath.resolve(newFileName);
        file.transferTo(filePath.toFile());

        return "/images/" + newFileName;
    }
}
