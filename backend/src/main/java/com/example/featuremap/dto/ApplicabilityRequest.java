package com.example.featuremap.dto;

public class ApplicabilityRequest {

    private Long featureId;
    private Long marketId;
    private Boolean applicable;

    public ApplicabilityRequest() {}

    public ApplicabilityRequest(Long featureId, Long marketId, Boolean applicable) {
        this.featureId = featureId;
        this.marketId = marketId;
        this.applicable = applicable;
    }

    // Getters & Setters
    public Long getFeatureId() { return featureId; }
    public void setFeatureId(Long featureId) { this.featureId = featureId; }

    public Long getMarketId() { return marketId; }
    public void setMarketId(Long marketId) { this.marketId = marketId; }

    public Boolean getApplicable() { return applicable; }
    public void setApplicable(Boolean applicable) { this.applicable = applicable; }
}
