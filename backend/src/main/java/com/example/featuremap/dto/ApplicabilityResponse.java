package com.example.featuremap.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for sending Applicability data to the frontend
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicabilityResponse {

    private Long id;

    private Long featureId;
    private String featureName;

    private Long vehicleModelId;
    private String vehicleModelName;

    private Long marketId;
    private String marketName;

    private String status; // Example: "Available", "Unavailable", "Pending"
}

