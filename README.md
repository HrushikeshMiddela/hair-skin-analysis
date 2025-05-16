#  Hair & Skin Analysis SAAS App

A full-stack AI-powered web application for analyzing hair and skin conditions using image classification models. Users can upload a photo or capture one using their webcam, then choose between skin or hair analysis. The app returns a prediction with confidence and stores analysis history securely.

## 🧠 About the Project

This project leverages **Teachable Machine** models for real-time skin and hair condition analysis. It provides personalized feedback and stores results for future reference. Ideal for users interested in beauty, dermatology, or personal wellness.

> 🔐 Built with user authentication and Stripe-powered credit-based access (Premium model optional).

---

## 🚀 Features

- 🔐 Secure JWT Authentication  
- 🖼️ Upload or Capture Image  
- ✨ AI Model Predictions (Skin & Hair)  
- 💾 Save Analysis History to MongoDB  
- 💳 Stripe Integration for Credits/Payments   
- 📊 Confidence Score Display  
- 🧑 Personalized Dashboard  
- 📱 Responsive Design  

---

## 🛠️ Tech Stack

**Frontend:**

- React + TypeScript  
- Tailwind CSS   

**Backend:**

- Node.js + Express  
- MongoDB (with Mongoose)  
- JWT Auth  
- Stripe (for credit system)  

**ML Model:**

- Teachable Machine Image Models (Google)  

---

## 🧪 Getting Started

###  Clone the repo

```bash
git clone https://github.com/HrushikeshMiddela/hair-skin-analysis.git
cd hair-skin-analysis
```
### Install Dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the backend folder and add the following:

```sh
PORT=5000
MONGO_URI=mongodb://localhost:27017/hair_skin_db
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key

```

### Running the Application

#### Start the Backend Server

```sh
cd backend
npm start
```

#### Start the Frontend

```sh
cd frontend
npm run dev
```

