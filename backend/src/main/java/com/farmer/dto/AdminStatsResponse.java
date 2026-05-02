package com.farmer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponse {
    private Long totalUsers;
    private Long activeUsers;
    private Long totalCrops;
    private Long totalDiseases;
    private Long totalChats;
    private List<RecentUserDto> recentUsers;
    private List<DiseaseStatDto> diseaseStats;
    private List<CropStatDto> cropStats;
    private List<UserGrowthDto> userGrowth;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecentUserDto {
        private Long id;
        private String name;
        private String phone;
        private String joinedDate;
        private String location;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DiseaseStatDto {
        private String name;
        private Long count;
        private Double percentage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CropStatDto {
        private String crop;
        private Long count;
        private String color;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserGrowthDto {
        private String month;
        private Long users;
    }
}

// Made with Bob