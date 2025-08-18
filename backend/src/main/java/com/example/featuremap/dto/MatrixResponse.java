package com.example.featuremap.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for dashboard matrix response:
 * - features: list of features (id, name)
 * - vehicles: list of vehicles (id, name)
 * - market: current market name and ID
 * - cells: mapping of "featureId:vehicleId" -> status
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatrixResponse {

    @Data
    @AllArgsConstructor
    public static class IdName {
        private Long id;
        private String name;
    }

    private List<IdName> features;
    private List<IdName> vehicles;
    private String market;  // Market name
    private Long marketId;  // Market ID
    private Map<String, String> cells; // e.g. "1:2" -> "Available"
}
