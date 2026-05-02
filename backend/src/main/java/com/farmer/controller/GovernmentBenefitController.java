package com.farmer.controller;

import com.farmer.entity.GovernmentBenefit;
import com.farmer.service.GovernmentBenefitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/benefits")
@Tag(name = "Government Benefits", description = "Government schemes and subsidies for farmers")
@Slf4j
public class GovernmentBenefitController {

    @Autowired
    private GovernmentBenefitService benefitService;

    @GetMapping
    @Operation(summary = "Get all active government benefits")
    public ResponseEntity<List<GovernmentBenefit>> getAllBenefits() {
        log.info("GET /api/benefits - Fetching all active benefits");
        List<GovernmentBenefit> benefits = benefitService.getAllActiveBenefits();
        return ResponseEntity.ok(benefits);
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get benefits by category")
    public ResponseEntity<List<GovernmentBenefit>> getBenefitsByCategory(@PathVariable String category) {
        log.info("GET /api/benefits/category/{} - Fetching benefits by category", category);
        List<GovernmentBenefit> benefits = benefitService.getBenefitsByCategory(category);
        return ResponseEntity.ok(benefits);
    }

    @GetMapping("/state/{state}")
    @Operation(summary = "Get benefits by state")
    public ResponseEntity<List<GovernmentBenefit>> getBenefitsByState(@PathVariable String state) {
        log.info("GET /api/benefits/state/{} - Fetching benefits by state", state);
        List<GovernmentBenefit> benefits = benefitService.getBenefitsByState(state);
        return ResponseEntity.ok(benefits);
    }

    @GetMapping("/filter")
    @Operation(summary = "Get benefits by category and state")
    public ResponseEntity<List<GovernmentBenefit>> getBenefitsByCategoryAndState(
            @RequestParam String category,
            @RequestParam String state) {
        log.info("GET /api/benefits/filter - Fetching benefits by category: {} and state: {}", category, state);
        List<GovernmentBenefit> benefits = benefitService.getBenefitsByCategoryAndState(category, state);
        return ResponseEntity.ok(benefits);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get benefit by ID")
    public ResponseEntity<GovernmentBenefit> getBenefitById(@PathVariable Long id) {
        log.info("GET /api/benefits/{} - Fetching benefit by id", id);
        GovernmentBenefit benefit = benefitService.getBenefitById(id);
        return ResponseEntity.ok(benefit);
    }

    @PostMapping
    @Operation(summary = "Create new government benefit (Admin only)")
    public ResponseEntity<GovernmentBenefit> createBenefit(@RequestBody GovernmentBenefit benefit) {
        log.info("POST /api/benefits - Creating new benefit: {}", benefit.getSchemeName());
        GovernmentBenefit createdBenefit = benefitService.createBenefit(benefit);
        return ResponseEntity.ok(createdBenefit);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update government benefit (Admin only)")
    public ResponseEntity<GovernmentBenefit> updateBenefit(
            @PathVariable Long id,
            @RequestBody GovernmentBenefit benefit) {
        log.info("PUT /api/benefits/{} - Updating benefit", id);
        GovernmentBenefit updatedBenefit = benefitService.updateBenefit(id, benefit);
        return ResponseEntity.ok(updatedBenefit);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete government benefit (Admin only)")
    public ResponseEntity<Void> deleteBenefit(@PathVariable Long id) {
        log.info("DELETE /api/benefits/{} - Deleting benefit", id);
        benefitService.deleteBenefit(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/deactivate")
    @Operation(summary = "Deactivate government benefit (Admin only)")
    public ResponseEntity<Void> deactivateBenefit(@PathVariable Long id) {
        log.info("PATCH /api/benefits/{}/deactivate - Deactivating benefit", id);
        benefitService.deactivateBenefit(id);
        return ResponseEntity.noContent().build();
    }
}

// Made with Bob