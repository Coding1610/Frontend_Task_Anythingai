# Frontend Task

A full-stack web application with secure authentication and CRUD operations, built with modern technologies and featuring role-based access control.

## Tech Stack

### Frontend
- **React** - UI framework
- **Redux** - State management
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - UI components
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **JWT** - Authentication
- **MongoDB Atlas** - Cloud database
- **Cloudinary** - Image storage

## Features

### Authentication & Security
- Secure JWT-based authentication
- Protected routes for both user and admin roles
- Role-based access control (User & Admin)
- Password encryption using Bcrypt
- Automatic logout on token expiration

### User Interface
- Modern blue color scheme UI
- Fully responsive design
- Clean and intuitive layout
- 404 error page
- Interactive dialog boxes

### User Roles

#### Normal User
- Personal dashboard
- Add comments functionality
- "Comments by Me" section with:
  - Search functionality
  - Filter and sort by name
  - Delete comments with modern dialog
- Profile management with avatar upload
- Secure logout

#### Admin User
- Admin dashboard with user statistics
- View all users with details
- Delete users with confirmation dialog
- Role-based page restrictions

### Email System
- Welcome email on user registration
- Notification email when admin deletes account
- Automated email services

### Responsive Design
- The application is fully responsive and optimized for,
- Desktop computers
- Tablets
- Mobile devices

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_FIREBASE_API_KEY=firebase_api_key
```

### Backend .env)
```env
PORT=5000
DATABASE_URI=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
FRONTEND_URL=your_frontend_url
```

## API Documentation
- For detailed API documentation including all endpoints, request bodies, and responses, please visit our Postman documentation
- https://documenter.getpostman.com/view/44899783/2sB3dJzsF6
