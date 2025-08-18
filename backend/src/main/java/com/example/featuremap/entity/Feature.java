package com.example.featuremap.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "features")
public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String description;

    public Feature() {}

    public Feature(String name, String category, String description) {
        this.name = name;
        this.category = category;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }

    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
