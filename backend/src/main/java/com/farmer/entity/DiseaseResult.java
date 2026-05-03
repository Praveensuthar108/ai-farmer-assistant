package com.farmer.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "disease_results")
public class DiseaseResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "crop_id", nullable = false)
    private Long cropId;
    
    @Column(name = "disease_name", nullable = false, length = 200)
    private String diseaseName;
    
    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal confidence;
    
    @Column(name = "detected_at", updatable = false)
    private LocalDateTime detectedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", insertable = false, updatable = false)
    private Crop crop;
    
    @PrePersist
    protected void onCreate() {
        detectedAt = LocalDateTime.now();
    }

    public DiseaseResult() {
    }

    public DiseaseResult(Long id, Long cropId, String diseaseName, BigDecimal confidence, LocalDateTime detectedAt, Crop crop) {
        this.id = id;
        this.cropId = cropId;
        this.diseaseName = diseaseName;
        this.confidence = confidence;
        this.detectedAt = detectedAt;
        this.crop = crop;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getDetectedAt() {
        return detectedAt;
    }

    public void setDetectedAt(LocalDateTime detectedAt) {
        this.detectedAt = detectedAt;
    }

    public Crop getCrop() {
        return crop;
    }

    public void setCrop(Crop crop) {
        this.crop = crop;
    }
}

// Made with Bob
