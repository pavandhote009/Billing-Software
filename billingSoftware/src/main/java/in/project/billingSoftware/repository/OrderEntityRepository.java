package in.project.billingSoftware.repository;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import in.project.billingSoftware.entity.OrderEntity;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {

	Optional<OrderEntity> findByOrderId(String orderId);
	
	List<OrderEntity> findAllByOrderByCreatedAtDesc();
	
	@Query("SELECT SUM(o.grandTotal) from OrderEntity o WHERE DATE(o.createdAt)= :date")
	Double sumSalesBydate(@Param("date")LocalDate date);
	
	
	@Query("SELECT COUNT(o) FROM OrderEntity o WHERE DATE(o.createdAt)= :date")
	Long countByOrderdate(@Param("date")LocalDate date);
	
	@Query("SELECT o FROM OrderEntity o ORDER BY o.createdAt DESC")
	List<OrderEntity> findRecentOrders(Pageable pageable);
}
