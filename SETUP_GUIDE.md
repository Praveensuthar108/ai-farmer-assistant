# 🚀 Quick Setup Guide - AI Farmer Assistant

## Step-by-Step Setup Instructions

### 1️⃣ Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17 installed (`java -version`)
- ✅ Maven installed (`mvn -version`)
- ✅ MySQL 8.0+ installed and running
- ✅ Node.js 16+ and npm installed (`node -v` and `npm -v`)

### 2️⃣ Get API Keys

You need three API keys:

#### Plant.id API Key
1. Go to https://web.plant.id/
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier: 100 requests/month

#### OpenAI API Key
1. Go to https://platform.openai.com/
2. Sign up and add payment method
3. Create API key from API Keys section
4. Cost: ~$0.002 per request (GPT-3.5-turbo)

#### OpenWeather API Key
1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Get API key from your account
4. Free tier: 1000 requests/day

### 3️⃣ Database Setup

Open MySQL command line or MySQL Workbench:

```sql
-- Create database
CREATE DATABASE ai_farmer_db;

-- Verify database created
SHOW DATABASES;

-- Use the database
USE ai_farmer_db;
```

### 4️⃣ Backend Configuration

1. Navigate to backend directory:
```bash
cd ai-farmer-assistant/backend
```

2. Open `src/main/resources/application.properties`

3. Update the following properties:

```properties
# Database - Update with your MySQL credentials
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

# API Keys - Replace with your actual keys
plantid.api.key=YOUR_PLANT_ID_API_KEY
openai.api.key=YOUR_OPENAI_API_KEY
openweather.api.key=YOUR_OPENWEATHER_API_KEY
```

4. Create uploads directory:
```bash
mkdir uploads
```

### 5️⃣ Start Backend

From the backend directory:

```bash
# Clean and build
mvn clean install

# Run the application
mvn spring-boot:run
```

**Expected Output:**
```
Started AiFarmerAssistantApplication in X.XXX seconds
```

Backend will be running on: `http://localhost:8080`

### 6️⃣ Start Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd ai-farmer-assistant/frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view ai-farmer-assistant-frontend in the browser.
Local: http://localhost:3000
```

Frontend will automatically open in your browser at: `http://localhost:3000`

### 7️⃣ Test the Application

1. **Register a New User:**
   - Click "Register here"
   - Fill in: Name, Phone (10 digits), Password
   - Select language (Hindi/Marathi)
   - Click "Get My Location" (optional)
   - Click "Register"

2. **Upload Crop Image:**
   - Click "Upload Crop Image"
   - Enter crop name (e.g., "Tomato")
   - Select an image file
   - Click "Detect Disease"

3. **Chat with AI:**
   - Click "Chat Assistant"
   - Ask questions in Hindi like:
     - "टमाटर की फसल में पानी कब देना चाहिए?"
     - "आलू में रोग कैसे रोकें?"

4. **Check Weather:**
   - Click "Weather Info"
   - View weather and farming advice

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Port 8080 already in use
```bash
# Solution: Change port in application.properties
server.port=8081
```

**Problem:** Database connection failed
```bash
# Solution: Check MySQL is running
# Windows: Check Services
# Mac/Linux: sudo systemctl status mysql
```

**Problem:** API key errors
```bash
# Solution: Verify API keys are correct and have quota
# Check API provider dashboards for usage limits
```

### Frontend Issues

**Problem:** npm install fails
```bash
# Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem:** CORS errors
```bash
# Solution: Ensure backend is running on port 8080
# Check SecurityConfig.java has correct CORS settings
```

**Problem:** Cannot connect to backend
```bash
# Solution: Verify backend is running
# Check browser console for exact error
# Ensure API_BASE_URL in api.js is correct
```

## 📊 Database Tables

After first run, these tables will be created automatically:
- `users` - User accounts
- `crops` - Uploaded crop images
- `disease_results` - Disease detection results
- `treatments` - Treatment information
- `chat_history` - Chat conversations

## 🔐 Default Test Credentials

For testing, you can create a user with:
- Phone: 9876543210
- Password: test123
- Name: Test Farmer

## 📝 API Testing with Postman

### Register User
```
POST http://localhost:8080/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "phone": "9876543210",
  "password": "test123",
  "language": "hi"
}
```

### Login
```
POST http://localhost:8080/api/users/login
Content-Type: application/json

{
  "phone": "9876543210",
  "password": "test123"
}
```

Copy the token from response and use it in subsequent requests:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 🎯 Next Steps

1. ✅ Application is running
2. ✅ Test all features
3. 📝 Customize treatment data in database
4. 🎨 Customize UI colors/branding
5. 🚀 Deploy to production (optional)

## 💡 Tips

- Keep backend and frontend terminals open
- Check browser console for errors
- Monitor backend logs for API issues
- Use incognito mode to test fresh sessions
- Clear browser cache if UI doesn't update

## 📞 Need Help?

- Check README.md for detailed documentation
- Review error messages in terminal/console
- Verify all prerequisites are installed
- Ensure API keys are valid and have quota
- Check MySQL is running and accessible

---

**Congratulations! Your AI Farmer Assistant is ready to use! 🎉**