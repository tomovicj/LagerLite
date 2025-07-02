package com.jovantomovic.lagerlite.service;

import com.jovantomovic.lagerlite.entity.Product;
import com.jovantomovic.lagerlite.entity.StockOut;
import com.jovantomovic.lagerlite.repo.StockOutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StockOutService {
    private final StockOutRepository repository;
    private final ProductService productService;

    public List<StockOut> getStockOut() {
        return repository.findByDeletedAtIsNull();
    }

    public Optional<StockOut> getStockOutById(Integer id) {
        return repository.findByIdAndDeletedAtIsNull(id);
    }

    public List<StockOut> getStockOutByProductId(Integer productId) {
        return repository.findByProductIdAndDeletedAtIsNull(productId);
    }

    public StockOut createStockOut(StockOut model) {
        Product product = productService
                .getProductById((model.getProduct().getId()))
                .orElseThrow();

        checkStock(product.getId(), model.getQuantity());

        StockOut so = new StockOut();
        so.setProduct(product);
        so.setQuantity(model.getQuantity());
        so.setCreatedAt(LocalDateTime.now());
        return repository.save(so);
    }

    public StockOut updateStockOut(Integer id, StockOut model) {
        StockOut so = getStockOutById(id).orElseThrow();
        Product product = productService
                .getProductById(model.getProduct().getId())
                .orElseThrow();

        checkStock(product.getId(), model.getQuantity());

        so.setProduct(product);
        so.setQuantity(model.getQuantity());
        return repository.save(so);
    }

    public void deleteStockOut(Integer id) {
        StockOut so = getStockOutById(id).orElseThrow();
        so.setDeletedAt(LocalDateTime.now());
        repository.save(so);
    }

    public BigDecimal getTotalStockOutForProduct(Integer productId) {
        return repository.getTotalStockOutForProduct(productId);
    }

    private void checkStock(Integer productId, BigDecimal stockOut) {
        BigDecimal stock = productService.getStockById(productId);
        if (stock.compareTo(stockOut) < 0) {
            throw new RuntimeException("INVALID AMOUNT OUT");
        }
    }
}
