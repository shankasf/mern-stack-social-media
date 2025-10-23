# MERN Social Media App

A full-stack social media application built with MongoDB, Express.js, React, and Node.js. This repository demonstrates a clean architecture adhering to SOLID principles and separation of concerns.

---

## 📚 Table of Contents
- [Features](#-features)
- [Architecture](#-architecture)
  - [Backend Architecture](#backend-architecture)
  - [Frontend Architecture](#frontend-architecture)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [SOLID Principles Implementation](#-solid-principles-implementation)
- [Key Features Implementation](#-key-features-implementation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Detailed Code Report](#detailed-code-report)

---

## 🚀 Features
- JWT-based authentication
- CRUD operations for posts
- Like and comment system
- Responsive React UI
- Optimistic updates
- SOLID-compliant architecture

---

## 🏗️ Architecture

### Backend Architecture
- **SRP**: Classes handle single responsibilities (controllers, services, repositories)
- **OCP**: Extend without modifying existing code using interfaces
- **LSP**: Derived classes can replace base classes
- **ISP**: Interfaces are client-specific
- **DIP**: Depend on abstractions, not concretions

### Frontend Architecture
- Component-based design
- Service layer for API separation
- Context API for lightweight global state
- Clean React implementation

---

## 📁 Project Structure
```
social_media/
├── server/                     # Backend
│   ├── config/                 # DB configuration
│   ├── container/              # Dependency injection
│   ├── controllers/            # HTTP handlers
│   ├── interfaces/             # Abstract interfaces
│   ├── middleware/             # Middleware
│   ├── models/                 # Mongoose models
│   ├── repositories/           # Data access layer
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   └── server.js               # Entry point
├── client/                     # Frontend
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── contexts/           # Context API
│   │   ├── pages/              # Page-level components
│   │   ├── services/           # API services
│   │   ├── types/              # Type definitions
│   │   └── App.js              # App entry
└── README.md
```

---

## 🛠️ Technologies Used

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs

### Frontend
- React
- React Router
- Axios
- Context API

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local/Atlas)

### Installation
```bash
git clone <repo-url>
cd social_media

# Backend
cd server
npm install
npm run dev

# Frontend
cd ../client
npm install
npm start
```
Default URLs: Frontend → `http://localhost:3000` | Backend → `http://localhost:5000`

---

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Posts
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
- `PUT /api/posts/:id/like`
- `POST /api/posts/:id/comments`

---

## 🧩 SOLID Principles Implementation

| Principle | Implementation |
|------------|----------------|
| SRP | Controllers, Services, Repositories have distinct roles |
| OCP | Extensible through interfaces |
| LSP | Repository pattern supports substitutability |
| ISP | Fine-grained interfaces |
| DIP | Dependency injection container |

---

## 🔧 Key Features Implementation

### Authentication
- JWT + bcrypt-based system
- Protected routes via middleware
- Token refresh mechanism

### Posts
- CRUD APIs
- Like/comment system
- Image uploads (Multer)

### Frontend
- Modular React components
- API service abstraction
- Context API for auth state

---

## 🧪 Testing
```bash
# Backend
dcd server
npm test

# Frontend
cd client
npm test
```

---

## 🚀 Deployment
- **Backend**: Use environment variables `MONGO_URI`, `JWT_SECRET`
- **Frontend**: Build static files using `npm run build`
- Deploy to Heroku, Render, Netlify, or Vercel

---

## 🤝 Contributing
1. Fork repo → create feature branch:
```bash
git checkout -b feat/your-feature
```
2. Add tests & follow coding standards.
3. Submit PR with clear description.

---

## 🪪 License
MIT License

---

## 👨‍💻 Maintainers
**Owner:** [shankasf](https://github.com/shankasf)

---

## 🙏 Acknowledgments
- SOLID architecture guidance
- Clean code and best practices

---

## 🧾 Detailed Code Report

### Backend Analysis

#### Server Configuration
- `server.js`: Main entry point implementing Express, middleware setup, and route registration
- `config/db.js`: MongoDB connection configuration with proper error handling
- `container/DIContainer.js`: Implements dependency injection for loose coupling
- `container/ServiceConfiguration.js`: Configures service dependencies and repositories

#### Controllers Layer
- `authController.js`: Handles user registration and authentication with JWT
- `PostController.js` & `postsController.js`: Need consolidation, currently handling similar post operations
- Recommendation: Merge duplicate controllers into a single `PostController.js`

#### Service Layer
- `AuthService.js`: Implements user authentication logic and token management
- `PostService.js`: Business logic for post operations with proper validation
- `LoggingService.js`: Centralized logging implementation
- `ValidationService.js`: Input validation and sanitization

#### Data Layer
- Well-structured repositories following Repository pattern
- `UserRepository.js`, `PostRepository.js`, `CommentRepository.js`: Clean data access abstraction
- Models using Mongoose schemas with proper validation

### Frontend Analysis

#### Component Structure
- `components/posts/`: Well-organized post-related components
- `components/ui/`: Reusable UI components (Button, Input, LoadingSpinner)
- Recommendation: Add prop-types or TypeScript for better type safety

#### State Management
- `contexts/AuthContext.js`: Effective authentication state management
- Services properly separated for API communication
- Recommendation: Consider centralizing API service for better maintainability

#### Areas for Improvement
1. Backend:
   - Consolidate duplicate controllers
   - Add comprehensive error handling
   - Implement request validation middleware

2. Frontend:
   - Centralize API service calls
   - Enhance loading state UX
   - Add proper TypeScript types

3. General:
   - Add automated tests
   - Implement proper logging
   - Add API documentation

