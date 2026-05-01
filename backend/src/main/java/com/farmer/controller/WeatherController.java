package com.farmer.controller;

import com.farmer.dto.WeatherResponse;
import com.farmer.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{lat}/{lon}")
    public ResponseEntity<WeatherResponse> getWeather(
            @PathVariable Double lat,
            @PathVariable Double lon) {
        WeatherResponse response = weatherService.getWeather(lat, lon);
        return ResponseEntity.ok(response);
    }
}

// Made with Bob
