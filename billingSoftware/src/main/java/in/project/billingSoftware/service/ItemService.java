package in.project.billingSoftware.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.project.billingSoftware.io.ItemRequest;
import in.project.billingSoftware.io.ItemResponse;

public interface ItemService {
	
	ItemResponse add(ItemRequest itemRequest, MultipartFile file);
	List<ItemResponse> fetchItems();
	void deleteItem(String itemid);

}
