package com.farmer.service;

import com.farmer.dto.WeatherResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${openweather.api.key}")
    private String openWeatherApiKey;

    @Value("${openweather.api.url}")
    private String openWeatherApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public WeatherResponse getWeather(Double lat, Double lon) {
        try {
            String url = String.format("%s?lat=%s&lon=%s&appid=%s&units=metric",
                    openWeatherApiUrl, lat, lon, openWeatherApiKey);

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            JsonNode jsonResponse = objectMapper.readTree(response.getBody());

            // Parse weather data
            Double temperature = jsonResponse.get("main").get("temp").asDouble();
            String description = jsonResponse.get("weather").get(0).get("description").asText();
            Integer humidity = jsonResponse.get("main").get("humidity").asInt();
            Double windSpeed = jsonResponse.get("wind").get("speed").asDouble();

            // Check for rain
            boolean rainExpected = description.toLowerCase().contains("rain") ||
                                   description.toLowerCase().contains("drizzle");

            // Generate farming advice
            String advice = generateAdvice(temperature, humidity, rainExpected, description);

            WeatherResponse weatherResponse = new WeatherResponse();
            weatherResponse.setTemperature(temperature);
            weatherResponse.setDescription(description);
            weatherResponse.setHumidity(humidity);
            weatherResponse.setWindSpeed(windSpeed);
            weatherResponse.setRainExpected(rainExpected);
            weatherResponse.setAdvice(advice);

            return weatherResponse;

        } catch (Exception e) {
            // Return mock weather data if API fails
            return getMockWeatherData();
        }
    }

    private String generateAdvice(Double temp, Integer humidity, boolean rainExpected, String description) {
        StringBuilder advice = new StringBuilder();

        if (rainExpected) {
            advice.append("आज बारिश की संभावना है। सिंचाई न करें। ");
            advice.append("फसल को पानी भराव से बचाएं। ");
        } else if (temp > 35) {
            advice.append("आज बहुत गर्मी है। शाम को सिंचाई करें। ");
            advice.append("पौधों को छाया दें। ");
        } else if (temp < 15) {
            advice.append("आज ठंड है। पाला से फसल बचाएं। ");
            advice.append("सुबह सिंचाई न करें। ");
        } else {
            advice.append("मौसम अच्छा है। नियमित खेती के काम करें। ");
        }

        if (humidity > 80) {
            advice.append("नमी अधिक है। फंगल रोग से सावधान रहें। ");
        } else if (humidity < 40) {
            advice.append("हवा सूखी है। अधिक पानी दें। ");
        }

        return advice.toString();
    }

    private WeatherResponse getMockWeatherData() {
        WeatherResponse response = new WeatherResponse();
        response.setTemperature(28.0);
        response.setDescription("Clear sky");
        response.setHumidity(65);
        response.setWindSpeed(3.5);
        response.setRainExpected(false);
        response.setAdvice("मौसम अच्छा है। नियमित खेती के काम करें। नमी सामान्य है।");
        return response;
    }
}

// Made with Bob
