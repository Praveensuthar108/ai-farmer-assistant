-- AI Farmer Assistant Database Schema

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    language VARCHAR(10) DEFAULT 'hi',
    role VARCHAR(20) DEFAULT 'USER',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_phone (phone),
    INDEX idx_role (role)
);

-- Crops Table
CREATE TABLE IF NOT EXISTS crops (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    crop_name VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- Disease Results Table
CREATE TABLE IF NOT EXISTS disease_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    crop_id BIGINT NOT NULL,
    disease_name VARCHAR(200) NOT NULL,
    confidence DECIMAL(5, 2) NOT NULL,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE,
    INDEX idx_crop_id (crop_id)
);

-- Treatments Table
CREATE TABLE IF NOT EXISTS treatments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    disease_name VARCHAR(200) UNIQUE NOT NULL,
    solution TEXT NOT NULL,
    fertilizer VARCHAR(500),
    precautions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_disease_name (disease_name)
);

-- Chat History Table
CREATE TABLE IF NOT EXISTS chat_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- Insert Sample Treatment Data
INSERT INTO treatments (disease_name, solution, fertilizer, precautions) VALUES
('Tomato Late Blight', 'पौधों पर कॉपर-आधारित फंगीसाइड का छिड़काव करें। संक्रमित पत्तियों को हटा दें।', 'NPK 19:19:19', 'पौधों के बीच उचित दूरी रखें। अधिक पानी से बचें।'),
('Potato Early Blight', 'मैनकोजेब या क्लोरोथैलोनिल का उपयोग करें। संक्रमित पत्तियों को जला दें।', 'DAP और पोटाश', 'फसल चक्र अपनाएं। खेत को साफ रखें।'),
('Apple Scab', 'कैप्टान या माइक्लोब्यूटानिल का छिड़काव करें।', 'NPK 10:26:26', 'गिरी हुई पत्तियों को हटाएं। पेड़ों की छंटाई करें।'),
('Corn Common Rust', 'ट्राइएज़ोल फंगीसाइड का उपयोग करें।', 'यूरिया और DAP', 'प्रतिरोधी किस्में लगाएं। खरपतवार नियंत्रण करें।'),
('Grape Black Rot', 'मैनकोजेब का नियमित छिड़काव करें।', 'NPK 12:32:16', 'संक्रमित फलों को हटाएं। हवा का संचार बढ़ाएं।'),
('Healthy Plant', 'आपका पौधा स्वस्थ है! नियमित देखभाल जारी रखें।', 'संतुलित NPK उर्वरक', 'नियमित पानी दें। कीटों की निगरानी करें।');

-- Made with Bob
