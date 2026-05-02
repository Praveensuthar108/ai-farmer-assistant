package com.farmer.exception;

public class ApiException extends RuntimeException {
    
    private String apiName;
    
    public ApiException(String apiName, String message) {
        super(String.format("Error calling %s API: %s", apiName, message));
        this.apiName = apiName;
    }
    
    public ApiException(String apiName, String message, Throwable cause) {
        super(String.format("Error calling %s API: %s", apiName, message), cause);
        this.apiName = apiName;
    }
    
    public String getApiName() {
        return apiName;
    }
}

// Made with Bob