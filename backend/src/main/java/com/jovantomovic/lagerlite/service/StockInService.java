package com.jovantomovic.lagerlite.service;

import com.jovantomovic.lagerlite.entity.Product;
import com.jovantomovic.lagerlite.entity.StockIn;
import com.jovantomovic.lagerlite.repo.StockInRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StockInService {
    private final StockInRepository repository;
    private final ProductService productService;

    public List<StockIn> getStockIn() {
        return repository.findByDeletedAtIsNull();
    }

    public Optional<StockIn> getStockInById(Integer id) {
        return repository.findByIdAndDeletedAtIsNull(id);
    }

    public StockIn createStockIn(StockIn model) {
        Product product = productService
                .getProductById(model.getProduct().getId())
                .orElseThrow();

        StockIn si = new StockIn();
        si.setProduct(product);
        si.setQuantity(model.getQuantity());
        si.setCreatedAt(LocalDateTime.now());
        return repository.save(si);
    }

    public StockIn updateStockIn(Integer id, StockIn model) {
        StockIn si = getStockInById(id).orElseThrow();
        Product product = productService
                .getProductById(model.getProduct().getId())
                .orElseThrow();

        si.setProduct(product);
        si.setQuantity(model.getQuantity());
        return repository.save(si);
    }

    public void deleteStockIn(Integer id) {
        StockIn si = getStockInById(id).orElseThrow();
        si.setDeletedAt(LocalDateTime.now());
        repository.save(si);
    }

    public BigDecimal getTotalStockInForProduct(Integer productId) {
        return repository.getTotalStockInForProduct(productId);
    }
}
