package in.project.billingSoftware.service;

import in.project.billingSoftware.entity.CategoryEntity;
import in.project.billingSoftware.io.CategoryRequest;
import in.project.billingSoftware.io.CategoryResponse;
import in.project.billingSoftware.repository.CategoryRepository;
import in.project.billingSoftware.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;
    private final ItemRepository itemRepository;
    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
    	String imgUrl = fileUploadService.uploadFile(file);
        CategoryEntity newCategory=convertToEntity(request);
        newCategory.setImgUrl(imgUrl);
        newCategory=categoryRepository.save(newCategory);
      return convertToResponse(newCategory);

    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
		Integer itemCount=itemRepository.countByCategoryId(newCategory.getId());
		// Convert CategoryEntity to CategoryResponse
       return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .imgUrl(newCategory.getImgUrl())
                .items(itemCount)
                .build();

    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }

	@Override
	public List<CategoryResponse> read() {
		// TODO Auto-generated method stub
		return categoryRepository.findAll()
				.stream()
				.map(categoryEntity->convertToResponse(categoryEntity))
				.collect(Collectors.toList());
		
	}

	@Override
	public void delete(String categoryId) {
		// TODO Auto-generated method stub
		CategoryEntity existingCategory=categoryRepository.findByCategoryId(categoryId)
				.orElseThrow(()->new RuntimeException("Category not found" + categoryId));
		fileUploadService.deleteFile(existingCategory.getImgUrl());
		categoryRepository.delete(existingCategory);
	}
}

























