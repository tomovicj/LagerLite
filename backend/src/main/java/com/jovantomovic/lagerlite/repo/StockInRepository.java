package com.jovantomovic.lagerlite.repo;

import com.jovantomovic.lagerlite.entity.StockIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface StockInRepository extends JpaRepository<StockIn, Integer> {
    List<StockIn> findByDeletedAtIsNull();
    Optional<StockIn> findByIdAndDeletedAtIsNull(Integer id);
    List<StockIn> findByProductIdAndDeletedAtIsNull(Integer productId);
    @Query("SELECT COALESCE(SUM(s.quantity), 0) FROM StockIn s WHERE s.product.id = :productId AND s.deletedAt IS NULL")
    BigDecimal getTotalStockInForProduct(@Param("productId") Integer productId);
}
