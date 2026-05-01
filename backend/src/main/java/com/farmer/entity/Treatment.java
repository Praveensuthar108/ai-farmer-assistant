package com.farmer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "treatments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Treatment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "disease_name", nullable = false, unique = true, length = 200)
    private String diseaseName;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String solution;
    
    @Column(length = 500)
    private String fertilizer;
    
    @Column(columnDefinition = "TEXT")
    private String precautions;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

// Made with Bob
