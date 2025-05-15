package in.project.billingSoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private String  categoryId;
    private String  name;
    private String  description;
    private String  bgColor;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imgUrl;
    private Integer items;
}
