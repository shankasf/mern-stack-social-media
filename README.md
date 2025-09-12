# MERN Social Media App

A full-stack social media application built with MongoDB, Express.js, React, and Node.js, following SOLID software development principles.

## 🚀 Features

- **User Authentication**: Register, login, and secure JWT-based authentication
- **Post Management**: Create, read, update, and delete posts
- **Social Interactions**: Like posts and add comments
- **Real-time Updates**: Dynamic UI updates for all interactions
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **SOLID Architecture**: Clean, maintainable, and extensible codebase

## 🏗️ Architecture

This project follows SOLID principles throughout:

### Backend Architecture
- **Single Responsibility Principle (SRP)**: Each class has one reason to change
- **Open/Closed Principle (OCP)**: Open for extension, closed for modification
- **Liskov Substitution Principle (LSP)**: Derived classes are substitutable for base classes
- **Interface Segregation Principle (ISP)**: Clients depend only on interfaces they use
- **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions

### Frontend Architecture
- **Component-based**: Reusable UI components
- **Service Layer**: Clean separation of concerns
- **Context API**: Global state management
- **TypeScript**: Type safety and better developer experience

## 📁 Project Structure

```
social_media/
├── server/                     # Backend (Node.js + Express)
│   ├── config/                # Database configuration
│   ├── container/             # Dependency injection container
│   ├── controllers/           # HTTP request handlers
│   ├── interfaces/            # Abstract interfaces
│   ├── middleware/            # Custom middleware
│   ├── models/                # Database models
│   ├── repositories/          # Data access layer
│   ├── routes/                # API routes
│   ├── services/              # Business logic layer
│   └── server.js              # Main server file
├── client/                    # Frontend (React)
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── posts/         # Post-related components
│   │   │   └── ui/            # Generic UI components
│   │   ├── contexts/          # React contexts
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   ├── types/             # TypeScript type definitions
│   │   └── App.js             # Main app component
│   └── package.json
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **Context API**: State management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social_media
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/social_media
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `PUT /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Add comment to post

## 🏛️ SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)
- **Controllers**: Only handle HTTP requests/responses
- **Services**: Only contain business logic
- **Repositories**: Only handle data access
- **Models**: Only define data structure

### 2. Open/Closed Principle (OCP)
- **Interfaces**: Allow extension without modification
- **Service Layer**: Easy to add new services
- **Component Architecture**: Reusable and extensible

### 3. Liskov Substitution Principle (LSP)
- **Repository Pattern**: All repositories implement the same interface
- **Service Pattern**: Services can be substituted without breaking functionality

### 4. Interface Segregation Principle (ISP)
- **Focused Interfaces**: Each interface has a specific purpose
- **Client-specific Contracts**: Clients only depend on what they need

### 5. Dependency Inversion Principle (DIP)
- **Dependency Injection**: Services depend on abstractions
- **Interface-based Design**: High-level modules don't depend on low-level modules

## 🔧 Key Features Implementation

### Authentication System
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes middleware
- Automatic token refresh

### Post Management
- CRUD operations for posts
- Image URL support
- Like/unlike functionality
- Comment system

### Frontend Architecture
- Component-based design
- Service layer for API calls
- Context API for state management
- TypeScript for type safety

## 🧪 Testing

To run tests (when implemented):
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Update environment variables for production
3. Deploy to platforms like Heroku, Vercel, or AWS

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following SOLID principles
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- SOLID principles implementation
- Clean architecture patterns
- Modern React and Node.js best practices
