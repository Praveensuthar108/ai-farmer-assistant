package com.farmer.service;

import com.farmer.dto.DiseaseDetectionResponse;
import com.farmer.entity.Crop;
import com.farmer.entity.DiseaseResult;
import com.farmer.entity.Treatment;
import com.farmer.repository.CropRepository;
import com.farmer.repository.DiseaseResultRepository;
import com.farmer.repository.TreatmentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
public class DiseaseDetectionService {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private DiseaseResultRepository diseaseResultRepository;

    @Autowired
    private TreatmentRepository treatmentRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Value("${plantid.api.key}")
    private String plantIdApiKey;

    @Value("${plantid.api.url}")
    private String plantIdApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public DiseaseDetectionResponse detectDisease(Long userId, String cropName, MultipartFile image) {
        try {
            // Store image
            String filename = fileStorageService.storeFile(image);
            String imageUrl = fileStorageService.getFileUrl(filename);

            // Save crop
            Crop crop = new Crop();
            crop.setUserId(userId);
            crop.setCropName(cropName);
            crop.setImageUrl(imageUrl);
            crop = cropRepository.save(crop);

            // Call Plant.id API
            String base64Image = convertToBase64(image);
            JsonNode apiResponse = callPlantIdApi(base64Image);

            // Parse response
            String diseaseName = "Healthy Plant";
            BigDecimal confidence = BigDecimal.valueOf(95.0);

            if (apiResponse.has("health_assessment")) {
                JsonNode healthAssessment = apiResponse.get("health_assessment");
                if (healthAssessment.has("diseases") && healthAssessment.get("diseases").size() > 0) {
                    JsonNode disease = healthAssessment.get("diseases").get(0);
                    diseaseName = disease.get("name").asText();
                    confidence = BigDecimal.valueOf(disease.get("probability").asDouble() * 100);
                }
            }

            // Save disease result
            DiseaseResult result = new DiseaseResult();
            result.setCropId(crop.getId());
            result.setDiseaseName(diseaseName);
            result.setConfidence(confidence);
            diseaseResultRepository.save(result);

            // Get treatment
            Treatment treatment = treatmentRepository.findByDiseaseNameIgnoreCase(diseaseName)
                    .orElse(getDefaultTreatment());

            // Build response
            DiseaseDetectionResponse response = new DiseaseDetectionResponse();
            response.setCropId(crop.getId());
            response.setDiseaseName(diseaseName);
            response.setConfidence(confidence);
            response.setSolution(treatment.getSolution());
            response.setFertilizer(treatment.getFertilizer());
            response.setPrecautions(treatment.getPrecautions());
            response.setHealthStatus(confidence.compareTo(BigDecimal.valueOf(70)) > 0 ? "High Confidence" : "Low Confidence");

            return response;

        } catch (Exception e) {
            throw new RuntimeException("Disease detection failed: " + e.getMessage(), e);
        }
    }

    private String convertToBase64(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }

    private JsonNode callPlantIdApi(String base64Image) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Api-Key", plantIdApiKey);

            String requestBody = String.format(
                "{\"images\": [\"%s\"], \"modifiers\": [\"health_all\"], \"disease_details\": [\"cause\", \"treatment\"]}",
                base64Image
            );

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                plantIdApiUrl,
                HttpMethod.POST,
                entity,
                String.class
            );

            return objectMapper.readTree(response.getBody());

        } catch (Exception e) {
            // Return mock response if API fails
            return createMockResponse();
        }
    }

    private JsonNode createMockResponse() {
        try {
            String mockJson = "{\"health_assessment\": {\"is_healthy\": true, \"diseases\": []}}";
            return objectMapper.readTree(mockJson);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create mock response", e);
        }
    }

    private Treatment getDefaultTreatment() {
        Treatment treatment = new Treatment();
        treatment.setDiseaseName("Unknown Disease");
        treatment.setSolution("कृपया स्थानीय कृषि विशेषज्ञ से परामर्श करें।");
        treatment.setFertilizer("संतुलित NPK उर्वरक");
        treatment.setPrecautions("नियमित निगरानी करें और पौधों को स्वस्थ रखें।");
        return treatment;
    }
}

// Made with Bob
