package com.example.featuremap.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.featuremap.dto.MappingDTO;
import com.example.featuremap.entity.Mapping;
import com.example.featuremap.repository.MappingRepository;
import com.example.featuremap.repository.FeatureRepository;
import com.example.featuremap.repository.VehicleModelRepository;
import com.example.featuremap.repository.MarketRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MappingService {

    private final MappingRepository mappingRepository;
    private final FeatureRepository featureRepository;
    private final VehicleModelRepository vehicleModelRepository;
    private final MarketRepository marketRepository;

    public MappingService(MappingRepository mappingRepository,
                          FeatureRepository featureRepository,
                          VehicleModelRepository vehicleModelRepository,
                          MarketRepository marketRepository) {
        this.mappingRepository = mappingRepository;
        this.featureRepository = featureRepository;
        this.vehicleModelRepository = vehicleModelRepository;
        this.marketRepository = marketRepository;
    }

    // Save Mapping
    @Transactional
    public MappingDTO saveMapping(MappingDTO dto) {
        Mapping mapping = new Mapping(
            dto.getFeatureId(),
            dto.getVehicleId(),
            dto.getMarketId(),
            dto.getStatus()
        );
        Mapping saved = mappingRepository.save(mapping);
        return convertToDTO(saved);
    }

    // Get all mappings
    @Transactional(readOnly = true)
    public List<MappingDTO> getAllMappings() {
        return mappingRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get mapping by ID
    @Transactional(readOnly = true)
    public MappingDTO getMappingById(Long id) {
        return mappingRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    // Update mapping
    @Transactional
    public MappingDTO updateMapping(Long id, MappingDTO dto) {
        return mappingRepository.findById(id)
                .map(mapping -> {
                    mapping.setFeatureId(dto.getFeatureId());
                    mapping.setVehicleId(dto.getVehicleId());
                    mapping.setMarketId(dto.getMarketId());
                    mapping.setStatus(dto.getStatus());
                    Mapping updated = mappingRepository.save(mapping);
                    return convertToDTO(updated);
                })
                .orElse(null);
    }

    // Delete mapping
    @Transactional
    public boolean deleteMapping(Long id) {
        if (!mappingRepository.existsById(id)) {
            return false;
        }
        mappingRepository.deleteById(id);
        return true;
    }

    // Convert Entity -> DTO with Names
    private MappingDTO convertToDTO(Mapping mapping) {
        MappingDTO dto = new MappingDTO();
        dto.setId(mapping.getId());
        dto.setFeatureId(mapping.getFeatureId());
        dto.setVehicleId(mapping.getVehicleId());
        dto.setMarketId(mapping.getMarketId());
        dto.setStatus(mapping.getStatus());

        // Fetch names safely
        featureRepository.findById(mapping.getFeatureId())
                .ifPresent(f -> dto.setFeatureName(f.getName()));
        vehicleModelRepository.findById(mapping.getVehicleId())
                .ifPresent(v -> dto.setVehicleName(v.getName()));
        marketRepository.findById(mapping.getMarketId())
                .ifPresent(m -> dto.setMarketName(m.getName()));

        return dto;
    }
}
