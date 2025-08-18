package com.example.featuremap.service;

import com.example.featuremap.entity.Feature;
import com.example.featuremap.repository.FeatureRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureService {

    private final FeatureRepository repository;

    public FeatureService(FeatureRepository repository) {
        this.repository = repository;
    }

    public List<Feature> getAllFeatures() {
        return repository.findAll();
    }

    public Feature addFeature(Feature feature) {
        return repository.save(feature);
    }

    public void deleteFeature(Long id) {
        repository.deleteById(id);
    }

    // Update Feature logic
    public Feature updateFeature(Long id, Feature updatedFeature) {
        Feature existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feature not found with id " + id));

        existing.setName(updatedFeature.getName());
        existing.setCategory(updatedFeature.getCategory());
        existing.setDescription(updatedFeature.getDescription());

        return repository.save(existing);
    }
}