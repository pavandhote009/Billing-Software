package in.project.billingSoftware.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.web.WebProperties.Resources.Chain.Strategy;

import in.project.billingSoftware.io.PaymentDetails;
import in.project.billingSoftware.io.PaymentMethod;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tbl_orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class OrderEntity {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	private String orderId;
	private String customerName;
	private String phoneNumber;
	private Double subTotal;
	private Double tax;
	private Double grandTotal;
	private LocalDateTime createdAt;
	
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval =true)
	@JoinColumn(name="order_id")
	private List<OrderItemEntity> items= new ArrayList<>();
	 
	@Embedded
	private PaymentDetails paymentdetails;
	
	@Enumerated(EnumType.STRING)
	private PaymentMethod paymentMethod;
	
	@PrePersist
	protected void onCreated() {
		this.orderId="ORD"+System.currentTimeMillis();
		this.createdAt=LocalDateTime.now();
	}
	
	
}
