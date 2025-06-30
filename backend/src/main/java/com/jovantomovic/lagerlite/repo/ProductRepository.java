package com.jovantomovic.lagerlite.repo;

import com.jovantomovic.lagerlite.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByDeletedAtIsNull();
    Optional<Product> findByIdAndDeletedAtIsNull(Integer id);
    Optional<Product> findByCodeAndDeletedAtIsNull(String code);
}
