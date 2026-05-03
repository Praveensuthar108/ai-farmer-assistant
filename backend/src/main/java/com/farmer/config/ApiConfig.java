package com.farmer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class ApiConfig {
    
    @Value("${plantid.api.url}")
    private String plantIdApiUrl;
    
    @Value("${plantid.api.key}")
    private String plantIdApiKey;
    
    @Value("${openai.api.url}")
    private String openAiApiUrl;
    
    @Value("${openai.api.key}")
    private String openAiApiKey;
    
    @Value("${openweather.api.url}")
    private String openWeatherApiUrl;
    
    @Value("${openweather.api.key}")
    private String openWeatherApiKey;
    
    @Bean(name = "plantIdWebClient")
    public WebClient plantIdWebClient() {
        return WebClient.builder()
                .baseUrl(plantIdApiUrl)
                .defaultHeader("Api-Key", plantIdApiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
    
    @Bean(name = "openAiWebClient")
    public WebClient openAiWebClient() {
        return WebClient.builder()
                .baseUrl(openAiApiUrl)
                .defaultHeader("Authorization", "Bearer " + openAiApiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
    
    @Bean(name = "openWeatherWebClient")
    public WebClient openWeatherWebClient() {
        return WebClient.builder()
                .baseUrl(openWeatherApiUrl)
                .build();
    }
    
    // Getters for API keys and URLs
    public String getPlantIdApiKey() {
        return plantIdApiKey;
    }
    
    public String getOpenAiApiKey() {
        return openAiApiKey;
    }
    
    public String getOpenWeatherApiKey() {
        return openWeatherApiKey;
    }
}

// Made with Bob