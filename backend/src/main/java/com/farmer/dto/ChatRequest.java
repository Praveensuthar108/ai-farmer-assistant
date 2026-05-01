package com.farmer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChatRequest {
    
    @NotBlank(message = "Question is required")
    private String question;
    
    private Long userId;
    
    private String language = "hi";
}

// Made with Bob
