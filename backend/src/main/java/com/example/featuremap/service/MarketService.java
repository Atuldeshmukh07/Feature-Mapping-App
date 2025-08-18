package com.example.featuremap.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.featuremap.entity.Market;
import com.example.featuremap.repository.MarketRepository;

@Service
public class MarketService {
    private final MarketRepository repo;
    public MarketService(MarketRepository repo) { this.repo = repo; }
    public List<Market> getAll() { return repo.findAll(); }
}
