package in.project.billingSoftware.io;

import java.time.LocalDateTime;

import in.project.billingSoftware.entity.OrderEntity;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDetails {
	
	private String razorpayOrderId;
	private String razorpayPaymentId;
	private String razorpaySignature;
	private PaymentStatus status;
	
	public enum PaymentStatus{
		PENDING, COMPLETED, FAILED
	}

}
