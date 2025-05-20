package in.project.billingSoftware.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.project.billingSoftware.entity.OrderItemEntity;

public interface OrderItemEntitiyRepository extends JpaRepository<OrderItemEntity, Long> {

}
