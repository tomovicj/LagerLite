package com.jovantomovic.lagerlite.controller;

import com.jovantomovic.lagerlite.entity.StockOut;
import com.jovantomovic.lagerlite.service.StockOutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/stock-out")
@CrossOrigin
@RequiredArgsConstructor
public class StockOutController {
    private final StockOutService service;

    @GetMapping
    public List<StockOut> getStockOut(@RequestParam(required = false) Integer productId) {
        if (productId != null) {
            return service.getStockOutByProductId(productId);
        }
        return service.getStockOut();
    }

    @PostMapping
    public StockOut createStockOut(StockOut model) {
        return service.createStockOut(model);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<StockOut> getStockOutById(@PathVariable Integer id) {
        return ResponseEntity.of(service.getStockOutById(id));
    }

    @PostMapping(path = "/{id}")
    public StockOut updateStockOut(@PathVariable Integer id, @RequestBody StockOut model) {
        return service.updateStockOut(id, model);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStockOut(@PathVariable Integer id) {
        service.deleteStockOut(id);
    }
}
