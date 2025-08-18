package com.example.featuremap.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mappings")
public class Mapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long featureId;

    @Column(nullable = false)
    private Long vehicleId;

    @Column(nullable = false)
    private Long marketId;

    @Column(nullable = false)
    private String status;

    // Constructors
    public Mapping() {}

    public Mapping(Long featureId, Long vehicleId, Long marketId, String status) {
        this.featureId = featureId;
        this.vehicleId = vehicleId;
        this.marketId = marketId;
        this.status = status;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFeatureId() { return featureId; }
    public void setFeatureId(Long featureId) { this.featureId = featureId; }
    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }
    public Long getMarketId() { return marketId; }
    public void setMarketId(Long marketId) { this.marketId = marketId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
