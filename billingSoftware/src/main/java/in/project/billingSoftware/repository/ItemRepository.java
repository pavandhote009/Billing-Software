package in.project.billingSoftware.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.project.billingSoftware.entity.ItemEntity;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
		Optional<ItemEntity> findByItemId(String itemId);
		Integer countByCategoryId(Long id);
}
