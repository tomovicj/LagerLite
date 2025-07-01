package com.jovantomovic.lagerlite.controller;

import com.jovantomovic.lagerlite.entity.StockIn;
import com.jovantomovic.lagerlite.service.StockInService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/stock-in")
@CrossOrigin
@RequiredArgsConstructor
public class StockInController {
    private final StockInService service;

    @GetMapping
    public List<StockIn> getStockIn() {
        return service.getStockIn();
    }

    @PostMapping
    public StockIn createStockIn(@RequestBody StockIn model) {
        return service.createStockIn(model);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<StockIn> getStockInById(@PathVariable Integer id) {
        return ResponseEntity.of(service.getStockInById(id));
    }

    @PostMapping(path = "/{id}")
    public StockIn updateStockIn(@PathVariable Integer id, @RequestBody StockIn model) {
        return service.updateStockIn(id, model);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStockIn(@PathVariable Integer id) {
        service.deleteStockIn(id);
    }
}
