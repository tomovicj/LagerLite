package com.jovantomovic.lagerlite.controller;

import com.jovantomovic.lagerlite.entity.Product;
import com.jovantomovic.lagerlite.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping(path = "/api/product")
@CrossOrigin
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;

    @GetMapping
    public List<Product> getProducts() {
        return service.getProducts();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product model) {
        return service.createProduct(model);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return ResponseEntity.of(service.getProductById(id));
    }

    @GetMapping(path = "/{id}/stock")
    public BigDecimal getStockById(@PathVariable Integer id) {
        return service.getStockById(id);
    }

    @PostMapping(path = "/{id}")
    public Product updateProduct(@PathVariable Integer id, @RequestBody Product model) {
        return service.updateProductById(id, model);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Integer id) {
        service.deleteProductById(id);
    }
}
