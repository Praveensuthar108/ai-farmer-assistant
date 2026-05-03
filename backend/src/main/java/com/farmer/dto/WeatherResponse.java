package com.farmer.dto;

public class WeatherResponse {
    private Double temperature;
    private String description;
    private Integer humidity;
    private Double windSpeed;
    private String advice;
    private Boolean rainExpected;

    public WeatherResponse() {
    }

    public WeatherResponse(Double temperature, String description, Integer humidity, Double windSpeed, String advice, Boolean rainExpected) {
        this.temperature = temperature;
        this.description = description;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.advice = advice;
        this.rainExpected = rainExpected;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getHumidity() {
        return humidity;
    }

    public void setHumidity(Integer humidity) {
        this.humidity = humidity;
    }

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public Boolean getRainExpected() {
        return rainExpected;
    }

    public void setRainExpected(Boolean rainExpected) {
        this.rainExpected = rainExpected;
    }
}

// Made with Bob
