# React Authentication Frontend

A modern authentication frontend built with React, TypeScript, and Vite. This application provides a complete authentication solution with both traditional email/password and social authentication methods.

## Features

- **User Authentication**

  - Email/Password Registration
  - Email Verification
  - Login with Email/Password
  - Password Reset Flow
  - Social Authentication (Google)
  - Form Validation with Formik
  - Protected Routes

- **User Profile**

  - View and Edit Profile Information
  - Change Password
  - Change Email with Verification

- **Modern UI/UX**
  - Responsive Design
  - Loading States
  - Error Handling
  - Form Validation Feedback
  - Clean and Modern Interface with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Formik (Form Management)
- @react-oauth/google (Google Authentication)
- Axios (API Client)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running ([Backend Repository](https://github.com/mrsvolodya/node_auth-app.git))

## Installation

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

3. Create a `.env` file in the root directory with the following variables:

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

## Environment Variables

- `VITE_API_URL`: URL of your backend API
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID (required for Google authentication)

## Project Structure

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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Authentication Flow

1. **Registration**

   - User fills out registration form
   - Backend creates account and sends verification email
   - User verifies email through link
   - Redirect to login

2. **Login**

   - User logs in with email/password or Google
   - Receives JWT token
   - Redirect to protected route

3. **Password Reset**
   - User requests password reset
   - Receives email with reset link
   - Sets new password
   - Redirect to login

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Related

- [Backend Repository](https://github.com/mrsvolodya/node_auth-app.git)

## License
