package com.farmer.constant;

public class AppConstants {
    
    // Application Info
    public static final String APP_NAME = "AI Farmer Assistant";
    public static final String APP_VERSION = "1.0.0";
    public static final String APP_DESCRIPTION = "AI-powered farming assistant application";
    
    // Pagination
    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final int MAX_PAGE_SIZE = 100;
    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_SORT_DIRECTION = "ASC";
    
    // File Upload
    public static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    public static final String[] ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/jpg", "image/png"};
    public static final String UPLOAD_DIR = "./uploads";
    
    // JWT
    public static final long JWT_EXPIRATION_MS = 86400000; // 24 hours
    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_PREFIX = "Bearer ";
    
    // Date Format
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String TIME_ZONE = "UTC";
    
    // Validation Messages
    public static final String REQUIRED_FIELD = "This field is required";
    public static final String INVALID_EMAIL = "Invalid email format";
    public static final String INVALID_PHONE = "Invalid phone number format";
    public static final String PASSWORD_MIN_LENGTH = "Password must be at least 6 characters";
    public static final String FILE_TOO_LARGE = "File size exceeds maximum allowed size";
    public static final String INVALID_FILE_TYPE = "Invalid file type. Only JPEG and PNG are allowed";
    
    // Disease Detection
    public static final double MIN_CONFIDENCE_THRESHOLD = 0.5;
    public static final int MAX_DISEASE_SUGGESTIONS = 5;
    
    // Chat
    public static final int MAX_CHAT_HISTORY = 50;
    public static final int CHAT_RESPONSE_TIMEOUT_SECONDS = 30;
    
    // Weather
    public static final String DEFAULT_WEATHER_UNITS = "metric";
    public static final int WEATHER_CACHE_DURATION_MINUTES = 30;
    
    private AppConstants() {
        // Private constructor to prevent instantiation
    }
}

// Made with Bob