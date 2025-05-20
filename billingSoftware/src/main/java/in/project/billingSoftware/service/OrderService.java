package in.project.billingSoftware.service;

import java.util.List;

import in.project.billingSoftware.io.OrderRequest;
import in.project.billingSoftware.io.OrderResponse;
import in.project.billingSoftware.io.PaymentVerificationRequest;

public interface OrderService {
	OrderResponse createOrder(OrderRequest request);
	void deleteOrder(String orderId);
	List<OrderResponse> getLatestOrders();
	OrderResponse verifyPayment(PaymentVerificationRequest request);
}
