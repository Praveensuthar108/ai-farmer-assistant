package com.farmer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "government_benefits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GovernmentBenefit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String schemeName;

    @Column(nullable = false)
    private String schemeNameHindi;

    @Column(nullable = false)
    private String schemeNameMarathi;

    @Column(nullable = false)
    private String category; // CROP_LOSS, SUBSIDY, INSURANCE, LOAN, EQUIPMENT

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descriptionHindi;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descriptionMarathi;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String eligibility;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String eligibilityHindi;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String eligibilityMarathi;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String benefits;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String benefitsHindi;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String benefitsMarathi;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String howToApply;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String howToApplyHindi;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String howToApplyMarathi;

    @Column(columnDefinition = "TEXT")
    private String documentsRequired;

    @Column(columnDefinition = "TEXT")
    private String documentsRequiredHindi;

    @Column(columnDefinition = "TEXT")
    private String documentsRequiredMarathi;

    @Column(length = 500)
    private String officialWebsite;

    @Column(length = 500)
    private String helplineNumber;

    @Column(nullable = false)
    private String state; // ALL_INDIA, MAHARASHTRA, GUJARAT, etc.

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

// Made with Bob