package com.example.featuremap.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Applicability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String feature;
    private String vehicleModel;
    private String market;
    private String status;

    public Applicability() {}
    
    public Applicability(String feature, String vehicleModel, String market, String status) {
        this.feature = feature;
        this.vehicleModel = vehicleModel;
        this.market = market;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getFeature() { return feature; }
    public void setFeature(String feature) { this.feature = feature; }
    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }
    public String getMarket() { return market; }
    public void setMarket(String market) { this.market = market; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
