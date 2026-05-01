package com.farmer.controller;

import com.farmer.dto.DiseaseDetectionResponse;
import com.farmer.service.DiseaseDetectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/disease")
public class DiseaseController {

    @Autowired
    private DiseaseDetectionService diseaseDetectionService;

    @PostMapping("/detect")
    public ResponseEntity<DiseaseDetectionResponse> detectDisease(
            @RequestParam("userId") Long userId,
            @RequestParam("cropName") String cropName,
            @RequestParam("image") MultipartFile image) {
        
        DiseaseDetectionResponse response = diseaseDetectionService.detectDisease(userId, cropName, image);
        return ResponseEntity.ok(response);
    }
}

// Made with Bob
