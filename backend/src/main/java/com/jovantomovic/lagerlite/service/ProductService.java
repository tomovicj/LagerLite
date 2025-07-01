package com.jovantomovic.lagerlite.service;

import com.jovantomovic.lagerlite.entity.Product;
import com.jovantomovic.lagerlite.repo.ProductRepository;
import com.jovantomovic.lagerlite.repo.StockInRepository;
import com.jovantomovic.lagerlite.repo.StockOutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repository;
    private final StockInRepository stockInRepository;
    private final StockOutRepository stockOutRepository;

    public List<Product> getProducts() {
        return repository.findByDeletedAtIsNull();
    }

    public Optional<Product> getProductById(Integer id) {
        return repository.findByIdAndDeletedAtIsNull(id);
    }

    public Optional<Product> getProductByCode(String code) {
        return repository.findByCodeAndDeletedAtIsNull(code);
    }

    public Product createProduct(Product model) {
        Product p = new Product();
        p.setName(model.getName());
        p.setDescription(model.getDescription());
        p.setCode(model.getCode());
        p.setCreatedAt(LocalDateTime.now());
        return repository.save(p);
    }

    public Product updateProductById(Integer id, Product model) {
        Product p = getProductById(id).orElseThrow();
        p.setName(model.getName());
        p.setDescription(model.getDescription());
        p.setCode(model.getCode());
        return repository.save(p);
    }

    public void deleteProductById(Integer id) {
        Product p = getProductById(id).orElseThrow();
        p.setDeletedAt(LocalDateTime.now());
        repository.save(p);
    }

    public BigDecimal getStockById(Integer productId) {
        BigDecimal stockIn = stockInRepository.getTotalStockInForProduct(productId);
        BigDecimal stockOut = stockOutRepository.getTotalStockOutForProduct(productId);
        return stockIn.subtract(stockOut);
    }
}
