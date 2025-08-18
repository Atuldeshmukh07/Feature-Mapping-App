package com.example.featuremap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.featuremap.entity.Applicability;

@Repository
public interface ApplicabilityRepository extends JpaRepository<Applicability, Long> { }
