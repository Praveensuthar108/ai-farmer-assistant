package com.farmer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "disease_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}

// Made with Bob
