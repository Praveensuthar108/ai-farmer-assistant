package com.farmer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeatherResponse {
    private Double temperature;
    private String description;
    private Integer humidity;
    private Double windSpeed;
    private String advice;
    private Boolean rainExpected;
}

// Made with Bob
