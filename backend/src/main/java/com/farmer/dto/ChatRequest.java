package com.farmer.dto;

import jakarta.validation.constraints.NotBlank;

public class ChatRequest {
    
    @NotBlank(message = "Question is required")
    private String question;
    
    private Long userId;
    
    private String language = "hi";

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}

// Made with Bob
