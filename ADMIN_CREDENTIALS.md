# 🔐 Admin Credentials

## Quick Setup - Register Admin Account

Since the application uses BCrypt password encryption, the easiest way to create an admin account is to register through the application:

### Option 1: Register Through UI (Recommended)

1. Go to http://localhost:3000
2. Click "Get Started" or "Register here"
3. Fill in the registration form:
   - **Name:** Admin User
   - **Phone:** 9999999999
   - **Password:** admin123
   - **Language:** English
   - **Location:** (Click "Get My Location" or enter manually)
4. Click "Register"
5. You'll be automatically logged in
6. Access admin dashboard at http://localhost:3000/admin

### Option 2: Use Existing Account

If you've already registered a user account, you can use those credentials:
- **Phone:** Your registered phone number
- **Password:** Your password

Then access the admin dashboard at http://localhost:3000/admin

---

## 📝 Test Credentials (After Registration)

**Admin Account:**
- Phone: `9999999999`
- Password: `admin123`
- Name: Admin User

**Test Farmer Account (if needed):**
- Phone: `9876543210`
- Password: `test123`
- Name: Test Farmer

---

## 🚀 How to Access Admin Dashboard

1. **From Home Page:**
   - Click "⚙️ Admin" button in navbar, OR
   - Click the floating gear icon (⚙️) at bottom-right corner

2. **Direct URL:**
   - http://localhost:3000/admin (requires login)

3. **After Login:**
   - You'll be redirected to the dashboard
   - Click the admin button to access admin features

---

## 🔒 Security Notes

- Passwords are encrypted using BCrypt
- JWT tokens are used for authentication
- Admin dashboard requires authentication
- All API endpoints are secured

---

## 💡 Quick Start

1. Register with phone: **9999999999** and password: **admin123**
2. Click the **⚙️ Admin** button (navbar or floating)
3. View comprehensive analytics and reports

**Your admin account is ready to use!**

---

Made with Bob