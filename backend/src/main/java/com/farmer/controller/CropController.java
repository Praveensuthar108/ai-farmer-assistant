package com.farmer.controller;

import com.farmer.entity.Crop;
import com.farmer.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    @Autowired
    private CropRepository cropRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Crop>> getCropsByUserId(@PathVariable Long userId) {
        List<Crop> crops = cropRepository.findByUserIdOrderByUploadedAtDesc(userId);
        return ResponseEntity.ok(crops);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Crop> getCropById(@PathVariable Long id) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crop not found"));
        return ResponseEntity.ok(crop);
    }
}

// Made with Bob
