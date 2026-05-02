package com.farmer.constant;

public class ApiConstants {
    
    // API Endpoints
    public static final String API_BASE_PATH = "/api";
    public static final String AUTH_PATH = API_BASE_PATH + "/users";
    public static final String CHAT_PATH = API_BASE_PATH + "/chat";
    public static final String CROP_PATH = API_BASE_PATH + "/crops";
    public static final String DISEASE_PATH = API_BASE_PATH + "/disease";
    public static final String TREATMENT_PATH = API_BASE_PATH + "/treatment";
    public static final String WEATHER_PATH = API_BASE_PATH + "/weather";
    
    // External API Names
    public static final String PLANT_ID_API = "Plant.id";
    public static final String OPENAI_API = "OpenAI";
    public static final String OPENWEATHER_API = "OpenWeather";
    
    // HTTP Headers
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String CONTENT_TYPE_JSON = "application/json";
    
    // Response Messages
    public static final String SUCCESS_MESSAGE = "Operation completed successfully";
    public static final String REGISTRATION_SUCCESS = "User registered successfully";
    public static final String LOGIN_SUCCESS = "Login successful";
    public static final String LOGOUT_SUCCESS = "Logout successful";
    
    private ApiConstants() {
        // Private constructor to prevent instantiation
    }
}

// Made with Bob