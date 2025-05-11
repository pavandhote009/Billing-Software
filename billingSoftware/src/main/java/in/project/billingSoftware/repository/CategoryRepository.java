package in.project.billingSoftware.repository;

import in.project.billingSoftware.entity.CategoryEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

	Optional<CategoryEntity> findByCategoryId(String categoryId);
    // Custom query methods can be defined here if needed
}
