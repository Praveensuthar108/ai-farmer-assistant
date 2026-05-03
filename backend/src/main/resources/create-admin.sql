-- Create Admin User
-- Password: admin123 (BCrypt encrypted)

INSERT INTO users (name, phone, password, language, location, created_at, updated_at)
VALUES (
    'Admin User',
    '9999999999',
    '$2a$10$xQKhF5xQKhF5xQKhF5xQKuO8YvZ8YvZ8YvZ8YvZ8YvZ8YvZ8YvZ8Y',
    'en',
    'Admin Office',
    NOW(),
    NOW()
);

-- Note: The password is 'admin123'
-- Phone: 9999999999

-- Made with Bob