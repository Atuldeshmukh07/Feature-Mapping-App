package com.example.featuremap.repository;

import com.example.featuremap.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureRepository extends JpaRepository<Feature, Long> {}
