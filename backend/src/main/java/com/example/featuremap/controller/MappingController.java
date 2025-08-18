package com.example.featuremap.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.featuremap.dto.MappingDTO;
import com.example.featuremap.service.MappingService;

@RestController
@RequestMapping("/api/mappings")
@CrossOrigin(origins = "http://localhost:3000")
public class MappingController {

    private final MappingService mappingService;

    public MappingController(MappingService mappingService) {
        this.mappingService = mappingService;
    }

    // Create new mapping
    @PostMapping
    public ResponseEntity<String> createMapping(@RequestBody MappingDTO mappingDTO) {
        mappingService.saveMapping(mappingDTO);
        return ResponseEntity.ok("Mapping saved successfully");
    }

    // Get all mappings
    @GetMapping
    public ResponseEntity<List<MappingDTO>> getAllMappings() {
        return ResponseEntity.ok(mappingService.getAllMappings());
    }

    // Get mapping by id
    @GetMapping("/{id}")
    public ResponseEntity<MappingDTO> getMappingById(@PathVariable Long id) {
        MappingDTO mapping = mappingService.getMappingById(id);
        if (mapping == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mapping);
    }

    // Update mapping
    @PutMapping("/{id}")
    public ResponseEntity<MappingDTO> updateMapping(@PathVariable Long id, @RequestBody MappingDTO dto) {
        MappingDTO updated = mappingService.updateMapping(id, dto);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // Delete mapping
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMapping(@PathVariable Long id) {
        boolean deleted = mappingService.deleteMapping(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
