package in.project.billingSoftware.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import in.project.billingSoftware.io.ItemRequest;
import in.project.billingSoftware.io.ItemResponse;
import in.project.billingSoftware.service.ItemService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ItemController {
	private final ItemService itemService;
	
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/admin/items")
	public ItemResponse addItem(@RequestPart("item") String itemString,
								@RequestPart("file") MultipartFile file) {
		ObjectMapper objectMapper = new ObjectMapper();
		ItemRequest itemRequest = null;
		try {
			itemRequest=objectMapper.readValue(itemString, ItemRequest.class);
			return itemService.add(itemRequest, file);
		} catch (JsonProcessingException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ErrorOccured while processing the JSON", e);
		}
	}
	
	
	@GetMapping("/items")
	public List<ItemResponse> readItems() {
		return itemService.fetchItems();
	}
	
	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/admin/items/{itemId}")
	public void removeItem(@PathVariable String itemId) {
		
		try {
			itemService.deleteItem(itemId);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found with id: " + itemId, e);
		}
	}

}





























