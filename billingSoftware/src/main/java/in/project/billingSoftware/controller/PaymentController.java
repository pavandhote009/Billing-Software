package in.project.billingSoftware.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import in.project.billingSoftware.io.OrderResponse;
import in.project.billingSoftware.io.PaymentRequest;
import in.project.billingSoftware.io.RazorpayOrderResponse;
import in.project.billingSoftware.service.OrderService;
import in.project.billingSoftware.service.RazorPayService;
import lombok.RequiredArgsConstructor;
import in.project.billingSoftware.io.PaymentVerificationRequest;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
	private final RazorPayService razorpayService;
	private final OrderService orderService;
	
	
	@PostMapping("/create-order")
	@ResponseStatus(HttpStatus.CREATED)
	public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) {
		return razorpayService.createOrder(request.getAmount(), request.getCurrency());
	}
	
	@PostMapping("/verify")
public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
		return orderService.verifyPayment(request);
		
	}
	

}
