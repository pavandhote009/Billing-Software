package in.project.billingSoftware.service;

import in.project.billingSoftware.io.CategoryRequest;
import in.project.billingSoftware.io.CategoryResponse;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface CategoryService {
  CategoryResponse add(CategoryRequest request ,MultipartFile file) ;
  List<CategoryResponse> read();
void delete(String categoryId) ;

}
