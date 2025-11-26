Frontend Task – Secure CRUD Platform with Role-Based Access

It is a fully responsive MERN-stack application that provides secure authentication, complete CRUD functionality, Cloudinary avatar uploads, and strict role-based route protection.
The project uses a modern blue-themed UI and maintains a clean separation between User and Admin roles.

Project Objective

The primary goal of this project is to implement :
1. Secure authentication using JWT and cookies
Complete CRUD functionality
Role-based access control (User and Admin)
Fully protected frontend and backend routes
Cloudinary integration for avatar image uploads
Email notifications on user registration and admin user deletion
A clean, responsive UI built with modern design tools

Tech Stack

Frontend
React
Redux Toolkit
Tailwind CSS
ShadCN UI
Zod (form validation)

Backend
Node.js
Express.js
MongoDB Atlas
JWT Authentication
Bcrypt.js (password hashing)

Additional Integrations
Cloudinary (for avatar uploads)
Nodemailer (email notifications)

Features
Authentication & Security
Secure JWT-based authentication stored in HTTP-only cookies
7-day session expiry
Login required to access any page
Role-based authorization (User and Admin)
Users cannot access Admin pages
Admin cannot access User-only pages
Passwords hashed using bcrypt
404 Not Found page included

User Features
View and update profile details
Upload avatar image (Cloudinary)
Dashboard with the ability to add comments
"Comments By Me" section to view personal comments
Search and filter comments by name
Delete comments using a confirmation dialog
Fully responsive interface
Logout functionality

Admin Features
Admin dashboard displaying total user count
"Get All Users" page to view complete user data
Delete any user using a confirmation dialog
Automatic email notification sent to a user when their account is deleted
Email System

Emails are sent automatically when:

A user registers
