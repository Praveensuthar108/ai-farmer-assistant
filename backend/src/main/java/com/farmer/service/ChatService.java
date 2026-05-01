package com.farmer.service;

import com.farmer.dto.ChatRequest;
import com.farmer.dto.ChatResponse;
import com.farmer.entity.ChatHistory;
import com.farmer.repository.ChatHistoryRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatService {

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Value("${openai.api.url}")
    private String openaiApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ChatResponse chat(ChatRequest request) {
        try {
            // Create system prompt based on language
            String systemPrompt = getSystemPrompt(request.getLanguage());

            // Call OpenAI API
            String answer = callOpenAiApi(systemPrompt, request.getQuestion());

            // Save chat history
            if (request.getUserId() != null) {
                ChatHistory history = new ChatHistory();
                history.setUserId(request.getUserId());
                history.setQuestion(request.getQuestion());
                history.setAnswer(answer);
                chatHistoryRepository.save(history);
            }

            return new ChatResponse(answer, request.getQuestion());

        } catch (Exception e) {
            throw new RuntimeException("Chat service failed: " + e.getMessage(), e);
        }
    }

    private String getSystemPrompt(String language) {
        if ("mr".equals(language)) {
            return "तुम्ही एक कृषी तज्ञ आहात. शेतकऱ्यांना सोप्या मराठी भाषेत व्यावहारिक सल्ला द्या. " +
                   "पिकांची काळजी, रोग नियंत्रण, खत व्यवस्थापन आणि हवामान सल्ला यावर लक्ष केंद्रित करा.";
        } else {
            return "आप एक कृषि विशेषज्ञ हैं। किसानों को सरल हिंदी भाषा में व्यावहारिक सलाह दें। " +
                   "फसल की देखभाल, रोग नियंत्रण, उर्वरक प्रबंधन और मौसम सलाह पर ध्यान दें। " +
                   "जवाब छोटे और समझने में आसान रखें।";
        }
    }

    private String callOpenAiApi(String systemPrompt, String userQuestion) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openaiApiKey);

            String requestBody = String.format(
                "{\"model\": \"gpt-3.5-turbo\", \"messages\": [" +
                "{\"role\": \"system\", \"content\": \"%s\"}, " +
                "{\"role\": \"user\", \"content\": \"%s\"}" +
                "], \"max_tokens\": 300, \"temperature\": 0.7}",
                systemPrompt.replace("\"", "\\\""),
                userQuestion.replace("\"", "\\\"")
            );

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                openaiApiUrl,
                HttpMethod.POST,
                entity,
                String.class
            );

            JsonNode jsonResponse = objectMapper.readTree(response.getBody());
            return jsonResponse.get("choices").get(0).get("message").get("content").asText().trim();

        } catch (Exception e) {
            // Return fallback response if API fails
            return getFallbackResponse(userQuestion);
        }
    }

    private String getFallbackResponse(String question) {
        String lowerQuestion = question.toLowerCase();
        
        if (lowerQuestion.contains("पानी") || lowerQuestion.contains("सिंचाई") || lowerQuestion.contains("water")) {
            return "फसल को नियमित रूप से पानी दें। गर्मी में सुबह या शाम को पानी दें। " +
                   "ड्रिप सिंचाई से पानी की बचत होती है। मिट्टी में नमी बनाए रखें।";
        } else if (lowerQuestion.contains("खाद") || lowerQuestion.contains("उर्वरक") || lowerQuestion.contains("fertilizer")) {
            return "संतुलित NPK उर्वरक का उपयोग करें। जैविक खाद जैसे गोबर की खाद डालें। " +
                   "मिट्टी परीक्षण के आधार पर खाद दें। अधिक खाद से बचें।";
        } else if (lowerQuestion.contains("रोग") || lowerQuestion.contains("बीमारी") || lowerQuestion.contains("disease")) {
            return "रोगग्रस्त पत्तियों को तुरंत हटाएं। कवकनाशी का छिड़काव करें। " +
                   "पौधों के बीच उचित दूरी रखें। खेत को साफ रखें।";
        } else if (lowerQuestion.contains("कीट") || lowerQuestion.contains("pest")) {
            return "नीम का तेल या कीटनाशक का छिड़काव करें। जैविक कीट नियंत्रण अपनाएं। " +
                   "नियमित निगरानी करें। फसल चक्र अपनाएं।";
        } else {
            return "कृपया अपना सवाल स्पष्ट रूप से पूछें। मैं फसल की देखभाल, रोग नियंत्रण, " +
                   "खाद प्रबंधन और सिंचाई के बारे में मदद कर सकता हूं।";
        }
    }
}

// Made with Bob
