# 🚖 Uber Clone Project

![Uber Clone](https://your-image-url.com/uber-clone-banner.png)

This is a full-stack Uber Clone application built using **Next.js** for the client-side and **Node.js** with **Express** for the server-side. The project implements real-time ride tracking, user and captain authentication, ride creation, and more.

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Client](#running-the-client)
  - [Running the Server](#running-the-server)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features

✅ **User Authentication**: Sign up, log in, and log out for both users and captains.  
✅ **Real-Time Tracking**: Live location tracking using Google Maps API.  
✅ **Ride Management**: Create, start, and complete rides with fare calculation.  
✅ **Captain Management**: Captains can manage their profiles and rides.  
✅ **Socket.IO Integration**: Real-time communication between users and captains.  
✅ **Responsive Design**: Fully responsive UI for mobile and desktop.

---

## 🛠 Tech Stack

### **Client**
- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **State Management**: React Context API
- **Real-Time Communication**: Socket.IO
- **Maps**: Google Maps API

### **Server**
- **Runtime**: [Node.js](https://nodejs.org)
- **Framework**: [Express.js](https://expressjs.com)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io)
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time Communication**: Socket.IO

---

## 📂 Folder Structure

```plaintext
UberClone/
├── client/         # Frontend application
│   ├── app/        # Next.js app directory
│   ├── components/ # Reusable React components
│   ├── context/    # Context API for state management
│   ├── hooks/      # Custom React hooks
│   ├── public/     # Static assets
│   ├── .env        # Environment variables for the client
│   ├── next.config.ts # Next.js configuration
│   ├── README.md   # Client-specific README
│
├── server/         # Backend application
│   ├── prisma/     # Prisma schema and migrations
│   ├── src/        # Source code for the server
│   │   ├── controllers/ # Route controllers
│   │   ├── middlewares/ # Express middlewares
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utility functions
│   │   ├── db/         # Database connection
│   │   ├── socket.ts   # Socket.IO configuration
│   ├── .env        # Environment variables for the server
│   ├── server.ts   # Entry point for the server
│   ├── README.md   # Server-specific README
```

---

## 🏁 Getting Started

### 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Google Maps API Key**

### ⚡ Installation

Clone the repository:

```bash
 git clone https://github.com/CodeSahil21/UberClone.git
 cd uber-clone
```

Install dependencies for both client and server:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 🚀 Running the Client

Navigate to the client folder and start the development server:

```bash
cd client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🚀 Running the Server

Navigate to the server folder:

```bash
cd server
```

Apply Prisma migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

The server will run on [http://localhost:4000](http://localhost:4000).

---

## 🔑 Environment Variables

### **Client**
Create a `.env` file in the `client` folder with the following variables:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### **Server**
Create a `.env` file in the `server` folder with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/uber_clone
JWT_SECRET=your_jwt_secret
```

---

## 📡 API Documentation

The server exposes the following endpoints:

### **User Authentication**
- `POST /api/users/signup` - Register a new user.
- `POST /api/users/signin` - Log in an existing user.

### **Ride Management**
- `POST /api/rides/create` - Create a new ride.
- `GET /api/rides/start-ride` - Start a ride.
- `GET /api/rides/end-ride` - End a ride.

For detailed API documentation, refer to the [`server/README.md`](server/README.md).

---

## 🌍 Deployment

### **Client**
The client can be deployed on **Vercel**:

1. Push your code to GitHub.
2. Connect the repository to Vercel.
3. Add environment variables in the Vercel dashboard.

### **Server**
The server can be deployed on **Heroku** or **AWS Elastic Beanstalk**:

1. Ensure the database is accessible.
2. Configure environment variables.
3. Deploy the application.

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature-branch
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Added new feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature-branch
   ```
5. **Open a Pull Request**.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

