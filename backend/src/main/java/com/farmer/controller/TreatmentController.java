package com.farmer.controller;

import com.farmer.entity.Treatment;
import com.farmer.repository.TreatmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/treatment")
public class TreatmentController {

    @Autowired
    private TreatmentRepository treatmentRepository;

    @GetMapping("/{diseaseName}")
    public ResponseEntity<Treatment> getTreatment(@PathVariable String diseaseName) {
        Treatment treatment = treatmentRepository.findByDiseaseNameIgnoreCase(diseaseName)
                .orElseThrow(() -> new RuntimeException("Treatment not found for disease: " + diseaseName));
        return ResponseEntity.ok(treatment);
    }
}

// Made with Bob
