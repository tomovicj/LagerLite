package com.jovantomovic.lagerlite.repo;

import com.jovantomovic.lagerlite.entity.StockOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockOutRepository extends JpaRepository<StockOut, Integer> {
    List<StockOut> findByDeletedAtIsNull();
    Optional<StockOut> findByIdAndDeletedAtIsNull(Integer id);
    List<StockOut> findByProductIdAndDeletedAtIsNull(Integer productId);
}
