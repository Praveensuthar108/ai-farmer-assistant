package com.farmer.dto;

public class AuthResponse {
    private String token;
    private Long userId;
    private String name;
    private String phone;
    private String language;

    public AuthResponse(String token, Long userId, String name, String phone, String language) {
        this.token = token;
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.language = language;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}

// Made with Bob
