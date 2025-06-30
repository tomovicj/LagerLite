package com.jovantomovic.lagerlite.repo;

import com.jovantomovic.lagerlite.entity.StockIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockInRepository extends JpaRepository<StockIn, Integer> {
    List<StockIn> findByDeletedAtIsNull();
    Optional<StockIn> findByIdAndDeletedAtIsNull(Integer id);
    List<StockIn> findByProductIdAndDeletedAtIsNull(Integer productId);
}
