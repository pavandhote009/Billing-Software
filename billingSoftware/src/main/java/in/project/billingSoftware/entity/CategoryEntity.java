package in.project.billingSoftware.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.jdbc.object.UpdatableSqlQuery;

import java.sql.Timestamp;

@Entity
@Table(name="tbl_category")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long    id;

    @Column(unique = true)
    private String  categoryId;

    @Column(unique = true)
    private String  name;
    private String  description;
    private String  bgColor;
    private String imgUrl;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp  updatedAt;
}
