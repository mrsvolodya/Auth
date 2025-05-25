import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/AuthContent.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <App />
      </Router>
    </GoogleOAuthProvider>
  </AuthProvider>
);
