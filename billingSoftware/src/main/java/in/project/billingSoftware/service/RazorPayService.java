package in.project.billingSoftware.service;

import in.project.billingSoftware.io.RazorpayOrderResponse;

public interface RazorPayService {
	RazorpayOrderResponse createOrder(Double amount,String currency);
}
