package in.project.billingSoftware.service;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.List;

import in.project.billingSoftware.io.OrderRequest;
import in.project.billingSoftware.io.OrderResponse;
import in.project.billingSoftware.io.PaymentVerificationRequest;

public interface OrderService {
	OrderResponse createOrder(OrderRequest request);
	void deleteOrder(String orderId);
	List<OrderResponse> getLatestOrders();
	OrderResponse verifyPayment(PaymentVerificationRequest request);
	
	Double sumSalesByDate(LocalDate date);
	Long countByorderdate(LocalDate date );
	List<OrderResponse> findRecentOrders( );
	
	
	
}
