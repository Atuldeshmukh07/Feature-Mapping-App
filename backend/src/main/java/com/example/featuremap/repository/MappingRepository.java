package com.example.featuremap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.featuremap.entity.Mapping;

@Repository
public interface MappingRepository extends JpaRepository<Mapping, Long> {
    // Optional: you can add custom query methods here
}
