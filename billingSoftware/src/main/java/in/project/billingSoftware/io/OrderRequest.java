package in.project.billingSoftware.io;

import java.time.LocalDateTime;
import java.util.List;

import in.project.billingSoftware.entity.OrderEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
	private String customerName;
	private String phoneNumber;
	private List<OrderItemRequest> cartItems;
	private Double subtotal;
	private Double grandTotal;
	private Double tax;
	private PaymentMethod paymentMethod;
	
	

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class OrderItemRequest{
		private String itemId;	
		private String name;
		private Double price;
		private Integer quantity;
	}
}
