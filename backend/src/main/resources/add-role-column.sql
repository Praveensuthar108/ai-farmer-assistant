-- Add role column to users table
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'USER';

-- Update existing users to have USER role
UPDATE users SET role = 'USER' WHERE role IS NULL;

-- Create an admin user
INSERT INTO users (name, phone, password, language, location, role, created_at, updated_at)
VALUES (
    'Admin',
    '1111111111',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhkm',
    'en',
    'Admin Office',
    'ADMIN',
    NOW(),
    NOW()
);

-- Admin credentials:
-- Phone: 1111111111
-- Password: admin@123

-- Made with Bob