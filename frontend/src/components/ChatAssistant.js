import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage, getChatHistory } from '../services/api';
import './Chat.css';

function ChatAssistant({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const response = await getChatHistory(user.userId);
      const history = response.data.reverse().map((chat) => [
        { text: chat.question, sender: 'user' },
        { text: chat.answer, sender: 'bot' },
      ]).flat();
      setMessages(history);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage({
        question: input,
        userId: user.userId,
        language: user.language || 'hi',
      });

      const botMessage = { text: response.data.answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="container">
        <div className="chat-header">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h2>💬 AI Farming Assistant</h2>
        </div>

        <div className="chat-card card">
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <h3>नमस्ते! मैं आपका कृषि सहायक हूं 🌾</h3>
                <p>मुझसे खेती से संबंधित कोई भी सवाल पूछें:</p>
                <ul>
                  <li>फसल की देखभाल</li>
                  <li>रोग नियंत्रण</li>
                  <li>खाद और उर्वरक</li>
                  <li>सिंचाई की जानकारी</li>
                </ul>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">{message.text}</div>
              </div>
            ))}

            {loading && (
              <div className="message bot">
                <div className="message-content typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="अपना सवाल यहाँ लिखें..."
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatAssistant;

// Made with Bob
