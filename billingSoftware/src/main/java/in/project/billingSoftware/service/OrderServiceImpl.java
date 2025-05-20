package in.project.billingSoftware.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import in.project.billingSoftware.entity.OrderEntity;
import in.project.billingSoftware.entity.OrderItemEntity;
import in.project.billingSoftware.io.OrderRequest;
import in.project.billingSoftware.io.OrderResponse;
import in.project.billingSoftware.io.PaymentDetails;
import in.project.billingSoftware.io.PaymentMethod;
import in.project.billingSoftware.io.PaymentVerificationRequest;
import in.project.billingSoftware.repository.OrderEntityRepository;
import in.project.billingSoftware.repository.OrderItemEntitiyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
	private final OrderEntityRepository orderentityRepository;

	@Override
	public OrderResponse createOrder(OrderRequest request) {
		OrderEntity newOrder=convertToOrderEntity(request);
		PaymentDetails paymentDetails = new PaymentDetails();
		paymentDetails.setStatus(newOrder.getPaymentMethod()==PaymentMethod.CASH ?
				PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING);
		newOrder.setPaymentdetails(paymentDetails);
		List<OrderItemEntity> orderItems= request.getCartItems().stream()
		.map(this::convertToOrderItemEntiity)
		.collect(Collectors.toList());
		
		newOrder.setItems(orderItems);
		newOrder=orderentityRepository.save(newOrder);
		return convertToResponse(newOrder);
		
	}
	
	private OrderItemEntity convertToOrderItemEntiity(OrderRequest.OrderItemRequest orderItemRequest) {
			return OrderItemEntity.builder()
					.itemId(UUID.randomUUID().toString())
					.name(orderItemRequest.getName())
					.price(orderItemRequest.getPrice())
					.quantity(orderItemRequest.getQuantity())
					.build();
					
	}

	private OrderResponse convertToResponse(OrderEntity newOrder) {
		return OrderResponse.builder()
				.orderId(newOrder.getOrderId())
				.customerName(newOrder.getCustomerName())
				.phoneNumber(newOrder.getPhoneNumber())
				.subtotal(newOrder.getSubTotal())
				.tax(newOrder.getTax())
				.grandTotal(newOrder.getGrandTotal())
				.paymentMethod(newOrder.getPaymentMethod())
				.items(newOrder.getItems().stream().map(this::convertToItemResponse)
						.collect(Collectors.toList()))
				.paymentDetails(newOrder.getPaymentdetails())
				.createdAt(newOrder.getCreatedAt())
				.build();
	}

	   private OrderEntity convertToOrderEntity(OrderRequest request) {
	        return OrderEntity.builder()
	            .customerName(request.getCustomerName())
	            .phoneNumber(request.getPhoneNumber())
	            .subTotal(request.getSubtotal())
	            .tax(request.getTax())
	            .grandTotal(request.getGrandTotal())
	            .paymentMethod(request.getPaymentMethod())
	            .build();
	    }
	
	private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderitemEntity) {
			return OrderResponse.OrderItemResponse.builder()
						.itemId(orderitemEntity.getItemId())
						.name(orderitemEntity.getName())
						.price(orderitemEntity.getPrice())
						.quantity(orderitemEntity.getQuantity())
						.build();
	}

	@Override
	public void deleteOrder(String orderId) {
		OrderEntity existingOrder = orderentityRepository.findByOrderId(orderId)
				.orElseThrow(()-> new RuntimeException("Order not found"));
		orderentityRepository.delete(existingOrder);

	}

	@Override
	public List<OrderResponse> getLatestOrders() {
		return orderentityRepository.findAllByOrderByCreatedAtDesc()
				.stream().map(this::convertToResponse)
				.collect(Collectors.toList());
	}

	@Override
	public OrderResponse verifyPayment(PaymentVerificationRequest request) {
		OrderEntity existingOrder = orderentityRepository.findByOrderId(request.getOrderId())
					.orElseThrow(()-> new RuntimeException("Order Not Found"));
		if (!VerifyRazorPaySignature(request.getRazorpayOrderId(),request.getRazorpayPaymentId(),request.getRazorpaySignature())) {
			
			throw new RuntimeException("Payment verification failed");
			
		}
		PaymentDetails paymentDetails=existingOrder.getPaymentdetails();
		paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
		paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
		paymentDetails.setRazorpaySignature(request.getRazorpaySignature());
		paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);
		
		existingOrder = orderentityRepository.save(existingOrder);	
		return convertToResponse(existingOrder);
		
	}

	private boolean VerifyRazorPaySignature(String razorpayOrderId, String razorpayPaymentId,
			String razorpaySignature) {
		// TODO Auto-generated method stub
		return true;
	}

}
