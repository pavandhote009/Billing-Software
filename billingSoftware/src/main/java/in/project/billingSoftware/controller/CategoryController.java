package in.project.billingSoftware.controller;

import in.project.billingSoftware.io.CategoryRequest;
import in.project.billingSoftware.io.CategoryResponse;
import in.project.billingSoftware.service.CategoryService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController

@RequiredArgsConstructor

public class CategoryController {

    private final CategoryService categoryService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file") MultipartFile file) {
        try {
            CategoryRequest request = objectMapper.readValue(categoryString, CategoryRequest.class);
            return categoryService.add(request, file);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category data");
        }
    }

    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories() {
        return categoryService.read();
    }

    @DeleteMapping("admin/categories/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found", e);
        }
    }
 

}
