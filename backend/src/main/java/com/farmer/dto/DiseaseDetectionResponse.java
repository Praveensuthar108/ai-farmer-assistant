package com.farmer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiseaseDetectionResponse {
    private Long cropId;
    private String diseaseName;
    private BigDecimal confidence;
    private String solution;
    private String fertilizer;
    private String precautions;
    private String healthStatus;
}

// Made with Bob
