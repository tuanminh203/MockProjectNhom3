package com.vti.service;

import com.vti.dto.CategoryRequest;
import com.vti.dto.CategoryResponse;
import com.vti.entity.Category;
import com.vti.exception.AppException;
import com.vti.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    // Lấy tất cả danh mục
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryResponse.class))
                .collect(Collectors.toList());
    }

    // Thêm danh mục mới
    public CategoryResponse createCategory(CategoryRequest request) {
        Category newCategory = modelMapper.map(request, Category.class);
        Category savedCategory = categoryRepository.save(newCategory);
        return modelMapper.map(savedCategory, CategoryResponse.class);
    }

    // Cập nhật danh mục
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException("Category không tồn tại.", HttpStatus.NOT_FOUND));

        category.setName(request.getName());
        Category updatedCategory = categoryRepository.save(category);
        return modelMapper.map(updatedCategory, CategoryResponse.class);
    }

    // Xóa danh mục
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new AppException("Category không tồn tại.", HttpStatus.NOT_FOUND);
        }
        categoryRepository.deleteById(id);
    }
}