package com.example.featuremap.controller;

import com.example.featuremap.entity.Feature;
import com.example.featuremap.service.FeatureService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/features")
@CrossOrigin(origins = "http://localhost:3000")
public class FeatureController {

    private final FeatureService service;

    public FeatureController(FeatureService service) {
        this.service = service;
    }

    @GetMapping
    public List<Feature> getAllFeatures() {
    List<Feature> features = service.getAllFeatures();
    return features != null ? features : new ArrayList<>();
}


    @PostMapping
    public Feature addFeature(@RequestBody Feature feature) {
        return service.addFeature(feature);
    }

    // Update Feature endpoint
    @PutMapping("/{id}")
    public Feature updateFeature(@PathVariable Long id, @RequestBody Feature updatedFeature) {
        return service.updateFeature(id, updatedFeature);
    }

    @DeleteMapping("/{id}")
    public void deleteFeature(@PathVariable Long id) {
        service.deleteFeature(id);
    }
}