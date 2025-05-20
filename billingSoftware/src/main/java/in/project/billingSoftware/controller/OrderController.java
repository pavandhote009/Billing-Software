package in.project.billingSoftware.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import in.project.billingSoftware.io.OrderRequest;
import in.project.billingSoftware.io.OrderResponse;
import in.project.billingSoftware.service.OrderService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
		private final OrderService orderService;
		
		@PostMapping()
		@ResponseStatus(HttpStatus.CREATED)
		public OrderResponse createdorder(@RequestBody OrderRequest request) {
			return orderService.createOrder(request);
		}
		
		
		@DeleteMapping("/{orderId}")
		public void deleteOrder(@PathVariable String orderId) {
			orderService.deleteOrder(orderId);
			
		}
		
		
		@GetMapping("/latest")
		public List<OrderResponse> getLatestOrders(){
			return orderService.getLatestOrders();
		}
}
