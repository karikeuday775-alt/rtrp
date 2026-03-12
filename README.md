# LuxeEstate - Premium AI-Powered Real Estate Marketplace

A luxury real estate platform where buyers and sellers connect directly without agents, powered by AI and modern web technologies.

## 🌟 Features

### Core Features
- **AI-Powered Search**: Intelligent property recommendations and natural language search
- **Direct Communication**: Buyers and sellers connect without intermediaries
- **3D Virtual Tours**: Immersive property viewing experience
- **Interactive Maps**: Google Maps integration with property markers
- **Real-time Messaging**: Instant communication between users
- **AI Investment Scoring**: Automated property investment analysis

### User Roles
- **Buyers**: Search, filter, save favorites, and communicate with sellers
- **Sellers**: List properties, manage listings, and chat with potential buyers
- **Admins**: Platform management and user oversight

### AI Features
- Smart property recommendations based on user behavior
- AI-generated property descriptions
- Investment score calculation
- Natural language search capabilities

## 🛠 Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Navigation
- **Axios** - API communication
- **React Query** - Data fetching and caching

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Cloudinary** - Image hosting

### Additional Technologies
- **Google Maps API** - Location services
- **OpenAI API** - AI features
- **Three.js** - 3D property tours
- **Bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd premium-real-estate-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp server/.env.example server/.env
   
   # Edit server/.env with your configuration
   ```

4. **Start the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev
   
   # Or run separately
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
├── server/                # Node.js backend
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── utils/            # Server utilities
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Charcoal (#2a2a2a)
- **Accent**: Gold (#f0a500)
- **Secondary**: White and Light Gray
- **Background**: Clean whites and subtle grays

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **UI Elements**: Poppins (sans-serif)

### Animation Philosophy
- Smooth, Apple-inspired transitions
- Subtle hover effects and micro-interactions
- Framer Motion for complex animations

## 🔧 Configuration

### Environment Variables

#### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/luxe-estate
JWT_SECRET=your-jwt-secret
PORT=5000
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
OPENAI_API_KEY=your-openai-key
GOOGLE_MAPS_API_KEY=your-maps-key
```

## 📊 Database Schema

### Users
- Authentication and profile information
- Role-based access (buyer/seller/admin)
- Preferences and search history

### Properties
- Comprehensive property details
- Location and pricing information
- Images and virtual tour links
- AI-generated scores

### Messages
- Real-time communication
- Conversation threading
- Read status tracking

### Favorites
- User property bookmarks
- Quick access to saved listings

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet.js security headers

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the `server` folder
3. Ensure MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🎯 Roadmap

- [ ] Complete property detail page with 3D tours
- [ ] Implement real-time messaging
- [ ] Add AI chat assistant
- [ ] Integrate payment processing
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 📞 Support

For support and questions, please open an issue in the repository.

---

**LuxeEstate** - Where luxury meets technology in real estate.