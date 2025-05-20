package in.project.billingSoftware.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import in.project.billingSoftware.io.OrderResponse;
import in.project.billingSoftware.io.RazorpayOrderResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RazorPayserviceImpl implements RazorPayService  {
	@Value("${razorpay.key.id}")
	private String razorpayKeyId;
	
	@Value("${razorpay.key.secret}")
	private String razorpayKeySecret;

	@Override
	public RazorpayOrderResponse createOrder(Double amount, String currency){
		try {
			RazorpayClient razorpayClient=new RazorpayClient(razorpayKeyId, razorpayKeySecret);
			JSONObject orderRequest=new JSONObject();
			orderRequest.put("amount", amount*100);
			orderRequest.put("currency", currency);
			orderRequest.put("receipt", "order_rcptid"+System.currentTimeMillis());
			orderRequest.put("payment_capture", 1);
			Order order = razorpayClient.orders.create(orderRequest);
			return convertToResponse(order);
		} catch (RazorpayException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
		
	}

	private RazorpayOrderResponse convertToResponse(Order order) {
		return RazorpayOrderResponse.builder()
					.id(order.get("id"))
					.entity(order.get("entity"))
					.amount(order.get("amount"))
					.status(order.get("status"))
					.currency(order.get("currency"))
					.createdAt(order.get("createdAt"))
					.receipt(order.get("receipt"))
					.build();
		
	}
	
	
	

}
