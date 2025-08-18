package com.example.featuremap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.featuremap.entity.Market;

@Repository
public interface MarketRepository extends JpaRepository<Market, Long> { }
