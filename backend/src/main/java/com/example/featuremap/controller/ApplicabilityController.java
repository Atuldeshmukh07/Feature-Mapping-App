package com.example.featuremap.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.featuremap.entity.Applicability;
import com.example.featuremap.service.ApplicabilityService;

@RestController
@RequestMapping("/api/applicability")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicabilityController {
    private final ApplicabilityService service;
    public ApplicabilityController(ApplicabilityService service) { this.service = service; }

    @GetMapping
    public List<Applicability> getAll() { return service.getAll(); }
}