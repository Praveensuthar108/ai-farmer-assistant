package com.farmer.dto;

public class ChatResponse {
    private String answer;
    private String question;

    public ChatResponse() {
    }

    public ChatResponse(String answer, String question) {
        this.answer = answer;
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}

// Made with Bob
