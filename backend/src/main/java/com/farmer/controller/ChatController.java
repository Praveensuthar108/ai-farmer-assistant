package com.farmer.controller;

import com.farmer.dto.ChatRequest;
import com.farmer.dto.ChatResponse;
import com.farmer.entity.ChatHistory;
import com.farmer.repository.ChatHistoryRepository;
import com.farmer.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        ChatResponse response = chatService.chat(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<ChatHistory>> getChatHistory(@PathVariable Long userId) {
        List<ChatHistory> history = chatHistoryRepository.findTop10ByUserIdOrderByCreatedAtDesc(userId);
        return ResponseEntity.ok(history);
    }
}

// Made with Bob
