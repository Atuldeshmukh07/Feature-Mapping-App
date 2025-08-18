package com.example.featuremap.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.featuremap.entity.Market;
import com.example.featuremap.service.MarketService;

@RestController
@RequestMapping("/api/markets")
@CrossOrigin(origins = "http://localhost:3000")
public class MarketController {
    private final MarketService service;
    public MarketController(MarketService service) { this.service = service; }

    @GetMapping
    public List<Market> getAll() { return service.getAll(); }
}
