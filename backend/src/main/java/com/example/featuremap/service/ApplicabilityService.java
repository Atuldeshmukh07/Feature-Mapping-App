package com.example.featuremap.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.featuremap.entity.Applicability;
import com.example.featuremap.repository.ApplicabilityRepository;

@Service
public class ApplicabilityService {
    private final ApplicabilityRepository repo;
    public ApplicabilityService(ApplicabilityRepository repo) { this.repo = repo; }
    public List<Applicability> getAll() { return repo.findAll(); }
}
