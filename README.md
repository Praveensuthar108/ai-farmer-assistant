# 🌾 AI Farmer Assistant

A full-stack AI-powered web application that helps farmers detect crop diseases from images, get treatment advice, and receive weather-based recommendations in Hindi/Marathi language.

## 🎯 Features

- **User Authentication**: JWT-based secure login/registration
- **Crop Disease Detection**: Upload crop images and detect diseases using Plant.id API
- **Treatment Recommendations**: Get detailed treatment solutions, fertilizer suggestions, and precautions
- **AI Chat Assistant**: Ask farming questions in Hindi/Marathi and get expert advice using OpenAI GPT-3.5
- **Weather Information**: Get real-time weather data and farming recommendations using OpenWeather API
- **Multi-language Support**: Hindi and Marathi language support

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- MySQL 8.0
- Spring Security with JWT
- Spring Data JPA
- Maven

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3

### APIs
- Plant.id API (Disease Detection)
- OpenAI GPT-3.5 (Chatbot)
- OpenWeather API (Weather Data)

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Node.js 16+ and npm
- API Keys:
  - Plant.id API Key (Get from https://plant.id/)
  - OpenAI API Key (Get from https://platform.openai.com/)
  - OpenWeather API Key (Get from https://openweathermap.org/api)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-farmer-assistant
```

### 2. Database Setup

Create MySQL database:

```sql
CREATE DATABASE ai_farmer_db;
```

The application will automatically create tables on first run.

### 3. Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Update `src/main/resources/application.properties` with your configurations:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ai_farmer_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

# API Keys
plantid.api.key=YOUR_PLANT_ID_API_KEY
openai.api.key=YOUR_OPENAI_API_KEY
openweather.api.key=YOUR_OPENWEATHER_API_KEY
```

Build and run the backend:

```bash
mvn clean install
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### 4. Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
ai-farmer-assistant/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/farmer/
│   │   │   │   ├── config/          # Security & Web configuration
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── repository/      # Database repositories
│   │   │   │   ├── security/        # JWT utilities
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql
│   │   └── pom.xml
│   └── uploads/                     # Uploaded images directory
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── services/                # API service layer
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/{id}` - Get user details

### Crop Management
- `GET /api/crops/user/{userId}` - Get user's crops
- `GET /api/crops/{id}` - Get crop details

### Disease Detection
- `POST /api/disease/detect` - Detect disease from image
  - Parameters: `userId`, `cropName`, `image` (multipart/form-data)

### Treatment
- `GET /api/treatment/{diseaseName}` - Get treatment for disease

### Chat
- `POST /api/chat` - Send chat message
- `GET /api/chat/history/{userId}` - Get chat history

### Weather
- `GET /api/weather/{lat}/{lon}` - Get weather information

## 💡 Usage

1. **Register/Login**: Create an account or login with phone number and password
2. **Upload Crop Image**: Navigate to upload section and select a crop image
3. **View Results**: See disease detection results with confidence score
4. **Get Treatment**: View detailed treatment recommendations
5. **Chat with AI**: Ask farming questions in Hindi/Marathi
6. **Check Weather**: Get weather-based farming advice

## 🔐 Security

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration for frontend-backend communication
- Secure API endpoints (except login/register)

## 🌐 Environment Variables

### Backend (application.properties)
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/ai_farmer_db
spring.datasource.username=root
spring.datasource.password=root
jwt.secret=YOUR_JWT_SECRET
jwt.expiration=86400000
plantid.api.key=YOUR_PLANT_ID_API_KEY
openai.api.key=YOUR_OPENAI_API_KEY
openweather.api.key=YOUR_OPENWEATHER_API_KEY
```

## 🐛 Troubleshooting

### Backend Issues
- **Database Connection Error**: Check MySQL is running and credentials are correct
- **Port Already in Use**: Change port in application.properties
- **API Key Errors**: Verify API keys are valid and have sufficient quota

### Frontend Issues
- **CORS Error**: Ensure backend CORS configuration includes frontend URL
- **API Connection Failed**: Check backend is running on port 8080
- **Build Errors**: Delete node_modules and run `npm install` again

## 📝 Sample Data

The application includes sample treatment data for common crop diseases:
- Tomato Late Blight
- Potato Early Blight
- Apple Scab
- Corn Common Rust
- Grape Black Rot

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name

## 🙏 Acknowledgments

- Plant.id for disease detection API
- OpenAI for GPT-3.5 API
- OpenWeather for weather data API
- Spring Boot community
- React community

## 📞 Support

For support, email support@aifarmerassistant.com or create an issue in the repository.

---

**Note**: This is an MVP (Minimum Viable Product). For production use, consider:
- Adding comprehensive error handling
- Implementing rate limiting
- Adding logging and monitoring
- Setting up CI/CD pipeline
- Implementing caching
- Adding unit and integration tests
- Securing API keys using environment variables or secret management