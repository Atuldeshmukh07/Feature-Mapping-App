package com.example.featuremap.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.featuremap.entity.VehicleModel;
import com.example.featuremap.repository.VehicleModelRepository;

@RestController
@RequestMapping("/api/vehicle-models")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleModelController {

    private final VehicleModelRepository repo;

    public VehicleModelController(VehicleModelRepository repo) {
        this.repo = repo;
    }

    // Get all vehicle models (used for table and mapping dropdown)
    @GetMapping
    public List<VehicleModel> getAllVehicles() {
        return repo.findAll();
    }

    // Add a new vehicle
    @PostMapping
    public VehicleModel addVehicle(@RequestBody VehicleModel vehicle) {
        return repo.save(vehicle);
    }

    // Delete a vehicle
    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
