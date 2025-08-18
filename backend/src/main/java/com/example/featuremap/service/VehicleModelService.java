package com.example.featuremap.service;

import com.example.featuremap.entity.VehicleModel;
import com.example.featuremap.repository.VehicleModelRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VehicleModelService {

    private final VehicleModelRepository repository;

    public VehicleModelService(VehicleModelRepository repository) {
        this.repository = repository;
    }

    public List<VehicleModel> getAllVehicles() {
        return repository.findAll();
    }

    public VehicleModel addVehicle(VehicleModel vehicle) {
        return repository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        repository.deleteById(id);
    }
}
