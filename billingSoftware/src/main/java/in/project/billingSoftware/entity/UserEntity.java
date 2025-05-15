package in.project.billingSoftware.entity;

import java.sql.Timestamp; // ✅ correct import

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "tbl_users")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String userId;
    
    private String email;
    private String password;
    private String role;
    private String name;
    
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;
    
    @UpdateTimestamp
    private Timestamp updatedAt;
}
