package in.project.billingSoftware.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_items")
@Data
@Builder
@NoArgsConstructor
 @AllArgsConstructor
public class ItemEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)
	private String itemId;
	private String name;
	private String description;
	private BigDecimal price;
	
	private String imgUrl;
	
	@CreationTimestamp
	private Timestamp createdAt;
	
	@UpdateTimestamp
	private Timestamp updatedAt;
	
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	@OnDelete(action = OnDeleteAction.RESTRICT)
	private CategoryEntity category;
	

}






























