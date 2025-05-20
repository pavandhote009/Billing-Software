package in.project.billingSoftware.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import in.project.billingSoftware.entity.CategoryEntity;
import in.project.billingSoftware.entity.ItemEntity;
import in.project.billingSoftware.io.ItemRequest;
import in.project.billingSoftware.io.ItemResponse;
import in.project.billingSoftware.repository.CategoryRepository;
import in.project.billingSoftware.repository.ItemRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
	
	private final FileUploadService fileUploadService;
	private final ItemRepository itemRepository;
	private final CategoryRepository categoryRepository;

	@Override
	public ItemResponse add(ItemRequest itemRequest, MultipartFile file) {
		String imgUrl = fileUploadService.uploadFile(file);
		ItemEntity newItem=convertToEntity(itemRequest, imgUrl);
		CategoryEntity existingCategory = categoryRepository.findByCategoryId(itemRequest.getCategoryId())
							.orElseThrow(() -> new RuntimeException("Category not found"+itemRequest.getCategoryId()));
		newItem.setCategory(existingCategory);
		newItem.setImgUrl(imgUrl);
		newItem = itemRepository.save(newItem);
		return convertToResponse(newItem);
		

	}

	private ItemResponse convertToResponse(ItemEntity newItem) {
		return ItemResponse.builder()
				.itemId(newItem.getItemId())
				.name(newItem.getName())
				.description(newItem.getDescription())
				.price(newItem.getPrice())
				.categoryName(newItem.getCategory().getName())
				.imgUrl(newItem.getImgUrl())
				.categoryId(newItem.getCategory().getId())
				.createdAt(newItem.getCreatedAt().toString())
				.updatedAt(newItem.getUpdatedAt().toString())
				.build();
	}

	private ItemEntity convertToEntity(ItemRequest itemRequest, String imgUrl) {
	return ItemEntity.builder()
				.itemId(UUID.randomUUID().toString())
				.name(itemRequest.getName())
				.description(itemRequest.getDescription())
				.price(itemRequest.getPrice())
				
				.build();

	
	}

	@Override
	public List<ItemResponse> fetchItems() {
		return itemRepository.findAll()
		             .stream()
		             .map(itemEntity->convertToResponse(itemEntity))
		             .collect(Collectors.toList());
	}

	@Override
	public void deleteItem(String itemid) {
		//we have to delete image from the database 
		ItemEntity existingItem = itemRepository.findByItemId(itemid)
				.orElseThrow(() -> new RuntimeException("Item not found with id: " + itemid));
		boolean isfileDeleted = fileUploadService.deleteFile(existingItem.getImgUrl());
		if (!isfileDeleted) {
			itemRepository.delete(existingItem);
		}else {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete file");
		}
		


	}


}

























