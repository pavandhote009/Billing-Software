package in.project.billingSoftware.io;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponse {
	
	private String itemId;
	private String name;
	private String description;
	private BigDecimal price;
	private Long categoryId;
	private String imgUrl;
	private String categoryName;
	private String createdAt;
	private String updatedAt;
	

}
