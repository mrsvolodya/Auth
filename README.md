# React Authentication Frontend

![Project Banner/Logo Here]

> A modern, secure, and user-friendly authentication solution built with React, TypeScript, and Vite.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple)](https://vitejs.dev/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Authentication Flow](#authentication-flow)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [Related Projects](#related)
- [License](#license)

## 🚀 Overview

This project provides a complete authentication solution with both traditional email/password and social authentication methods. Built with modern React practices and TypeScript, it offers a secure and scalable foundation for your application's authentication needs.

### Key Benefits

- 🔒 Secure Authentication
- 🎨 Modern UI/UX
- 📱 Responsive Design
- ⚡ Fast Performance
- 🔧 Easy Integration

## ✨ Features

### User Authentication
- ✅ Email/Password Registration
- ✅ Email Verification
- ✅ Login with Email/Password
- ✅ Password Reset Flow
- ✅ Social Authentication (Google)
- ✅ Form Validation with Formik

### User Profile
- ✅ View and Edit Profile Information
- ✅ Change Password
- ✅ Change Email with Verification

### Modern UI/UX
- ✅ Responsive Design
- ✅ Loading States
- ✅ Error Handling
- ✅ Form Validation Feedback
- ✅ Clean and Modern Interface with Tailwind CSS

## 🎮 Demo

[Live Demo](your-demo-link-here)

![Demo Screenshot](path-to-screenshot)

## 🛠 Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Form Management:** Formik
- **Authentication:** @react-oauth/google
- **HTTP Client:** Axios

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running ([Backend Repository](https://github.com/mrsvolodya/node_auth-app.git))

### Installation

1. Clone the repository:
```bash
git clone [your-frontend-repo-url]
cd [your-frontend-directory]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3005
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | URL of your backend API | Yes |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── services/           # API services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── validation/         # Form validation schemas
└── ui/                 # UI components
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🔐 Authentication Flow

### Registration
1. User fills out registration form
2. Backend creates account and sends verification email
3. User verifies email through link
4. Redirect to login

### Login
1. User logs in with email/password or Google
2. Receives JWT token
3. Redirect to protected route

### Password Reset
1. User requests password reset
2. Receives email with reset link
3. Sets new password
4. Redirect to login

## 🔌 API Integration

The frontend integrates with a RESTful backend API. For detailed API documentation, visit the [Backend Repository](https://github.com/mrsvolodya/node_auth-app.git).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Related

- [Backend Repository](https://github.com/mrsvolodya/node_auth-app.git)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Support

For support, email your-email@example.com or join our Slack channel.

### Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the React and TypeScript communities
