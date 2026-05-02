package com.farmer.dto;

import java.math.BigDecimal;

public class DiseaseDetectionResponse {
    private Long cropId;
    private String diseaseName;
    private BigDecimal confidence;
    private String solution;
    private String fertilizer;
    private String precautions;
    private String healthStatus;

    public DiseaseDetectionResponse() {
    }

    public DiseaseDetectionResponse(Long cropId, String diseaseName, BigDecimal confidence, String solution, String fertilizer, String precautions, String healthStatus) {
        this.cropId = cropId;
        this.diseaseName = diseaseName;
        this.confidence = confidence;
        this.solution = solution;
        this.fertilizer = fertilizer;
        this.precautions = precautions;
        this.healthStatus = healthStatus;
    }

    public Long getCropId() {
        return cropId;
    }

    public void setCropId(Long cropId) {
        this.cropId = cropId;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public BigDecimal getConfidence() {
        return confidence;
    }

    public void setConfidence(BigDecimal confidence) {
        this.confidence = confidence;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getFertilizer() {
        return fertilizer;
    }

    public void setFertilizer(String fertilizer) {
        this.fertilizer = fertilizer;
    }

    public String getPrecautions() {
        return precautions;
    }

    public void setPrecautions(String precautions) {
        this.precautions = precautions;
    }

    public String getHealthStatus() {
        return healthStatus;
    }

    public void setHealthStatus(String healthStatus) {
        this.healthStatus = healthStatus;
    }
}

// Made with Bob
