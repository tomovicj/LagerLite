package com.jovantomovic.lagerlite.repo;

import com.jovantomovic.lagerlite.entity.StockOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface StockOutRepository extends JpaRepository<StockOut, Integer> {
    List<StockOut> findByDeletedAtIsNull();
    Optional<StockOut> findByIdAndDeletedAtIsNull(Integer id);
    List<StockOut> findByProductIdAndDeletedAtIsNull(Integer productId);
    @Query("SELECT COALESCE(SUM(s.quantity), 0) FROM StockOut s WHERE s.product.id = :productId AND s.deletedAt IS NULL")
    BigDecimal getTotalStockOutForProduct(@Param("productId") Integer productId);
}
