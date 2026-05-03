package com.farmer.service;

import com.farmer.dto.AdminStatsResponse;
import com.farmer.entity.User;
import com.farmer.exception.ResourceNotFoundException;
import com.farmer.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final DiseaseResultRepository diseaseResultRepository;
    private final ChatHistoryRepository chatHistoryRepository;

    public AdminStatsResponse getAdminStats(String range) {
        // Calculate date range
        LocalDateTime startDate = calculateStartDate(range);
        
        // Get total counts
        long totalUsers = userRepository.count();
        long totalCrops = cropRepository.count();
        long totalDiseases = diseaseResultRepository.count();
        long totalChats = chatHistoryRepository.count();
        
        // Calculate active users (users who uploaded crops or chatted in the range)
        long activeUsers = (long) (totalUsers * 0.715); // Mock calculation
        
        // Get recent users
        List<AdminStatsResponse.RecentUserDto> recentUsers = userRepository.findAll()
                .stream()
                .sorted((u1, u2) -> u2.getCreatedAt().compareTo(u1.getCreatedAt()))
                .limit(5)
                .map(user -> AdminStatsResponse.RecentUserDto.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .phone(user.getPhone())
                        .joinedDate(user.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE))
                        .location(user.getLocation() != null ? user.getLocation() : "Unknown")
                        .build())
                .collect(Collectors.toList());
        
        // Get disease statistics
        List<AdminStatsResponse.DiseaseStatDto> diseaseStats = getDiseaseStatistics();
        
        // Get crop statistics
        List<AdminStatsResponse.CropStatDto> cropStats = getCropStatistics();
        
        // Get user growth data
        List<AdminStatsResponse.UserGrowthDto> userGrowth = getUserGrowthData();
        
        return AdminStatsResponse.builder()
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .totalCrops(totalCrops)
                .totalDiseases(totalDiseases)
                .totalChats(totalChats)
                .recentUsers(recentUsers)
                .diseaseStats(diseaseStats)
                .cropStats(cropStats)
                .userGrowth(userGrowth)
                .build();
    }

    private LocalDateTime calculateStartDate(String range) {
        LocalDateTime now = LocalDateTime.now();
        return switch (range.toLowerCase()) {
            case "today" -> now.minusDays(1);
            case "week" -> now.minusWeeks(1);
            case "month" -> now.minusMonths(1);
            case "year" -> now.minusYears(1);
            default -> now.minusWeeks(1);
        };
    }

    private List<AdminStatsResponse.DiseaseStatDto> getDiseaseStatistics() {
        // Get disease counts from database
        Map<String, Long> diseaseCounts = new HashMap<>();
        
        diseaseResultRepository.findAll().forEach(result -> {
            String diseaseName = result.getDiseaseName();
            diseaseCounts.put(diseaseName, diseaseCounts.getOrDefault(diseaseName, 0L) + 1);
        });
        
        long total = diseaseCounts.values().stream().mapToLong(Long::longValue).sum();
        
        return diseaseCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(6)
                .map(entry -> AdminStatsResponse.DiseaseStatDto.builder()
                        .name(entry.getKey())
                        .count(entry.getValue())
                        .percentage(total > 0 ? (entry.getValue() * 100.0 / total) : 0.0)
                        .build())
                .collect(Collectors.toList());
    }

    private List<AdminStatsResponse.CropStatDto> getCropStatistics() {
        // Get crop counts from database
        Map<String, Long> cropCounts = new HashMap<>();
        Map<String, String> cropColors = Map.of(
                "Tomato", "#ef4444",
                "Potato", "#f59e0b",
                "Corn", "#eab308",
                "Apple", "#22c55e",
                "Grape", "#8b5cf6",
                "Others", "#6b7280"
        );
        
        cropRepository.findAll().forEach(crop -> {
            String cropName = crop.getCropName();
            cropCounts.put(cropName, cropCounts.getOrDefault(cropName, 0L) + 1);
        });
        
        return cropCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(6)
                .map(entry -> AdminStatsResponse.CropStatDto.builder()
                        .crop(entry.getKey())
                        .count(entry.getValue())
                        .color(cropColors.getOrDefault(entry.getKey(), "#6b7280"))
                        .build())
                .collect(Collectors.toList());
    }

    private List<AdminStatsResponse.UserGrowthDto> getUserGrowthData() {
        // Mock user growth data - in production, this would query the database
        // grouped by month
        List<AdminStatsResponse.UserGrowthDto> growth = new ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May"};
        long[] counts = {120L, 245L, 389L, 567L, 892L};
        
        for (int i = 0; i < months.length; i++) {
            growth.add(AdminStatsResponse.UserGrowthDto.builder()
                    .month(months[i])
                    .users(counts[i])
                    .build());
        }
        
        return growth;
    }

    public List<User> getPendingAdmins() {
        return userRepository.findByRoleAndIsApproved("ADMIN", false);
    }

    public List<User> getAllAdmins() {
        return userRepository.findByRole("ADMIN");
    }

    @Transactional
    public void approveAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        if (!"ADMIN".equals(user.getRole())) {
            throw new IllegalArgumentException("User is not an admin");
        }
        
        user.setIsApproved(true);
        userRepository.save(user);
    }

    @Transactional
    public void rejectAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        if (!"ADMIN".equals(user.getRole())) {
            throw new IllegalArgumentException("User is not an admin");
        }
        
        // Delete the user registration
        userRepository.delete(user);
    }
}

// Made with Bob