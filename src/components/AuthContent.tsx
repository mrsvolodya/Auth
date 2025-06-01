import React, { useMemo, useState } from "react";
import { accessTokenService } from "../services/accessTokenService";
import { authService } from "../services/authService";
import { AuthContextType, User } from "../types/users";

/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext<AuthContextType>({
  isChecked: false,
  currentUser: null as User | null,
  checkAuth: async () => {},
  activate: async (_token: string) => {},
  login: async (_email: string, _password: string) => {},
  logout: async () => {},
  googleSignIn: async () => {},
  gitHubSignIn: async (_code: string) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isChecked, setChecked] = useState(false);

  async function activate(activationToken: string) {
    const { accessToken, user } = await authService.activate(activationToken);
    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();
      accessTokenService.save(accessToken);
      setCurrentUser(user);
    } catch (error) {
      console.error("User is not authenticated", error);
    } finally {
      setChecked(true);
    }
  }

  async function login(email: string, password: string) {
    const { accessToken, user } = await authService.login(email, password);

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function googleSignIn(credential: string) {
    try {
      const { accessToken, user } = await authService.googleSignIn(credential);
      accessTokenService.save(accessToken);
      setCurrentUser(user);
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setCurrentUser(null);
  }

  async function gitHubSignIn(code: string) {
    try {
      const { accessToken, user } = await authService.gitHubSingIn(code);
      accessTokenService.save(accessToken);
      setCurrentUser(user);
    } catch (error) {
      console.error("Git Hub sign in error:", error);
      throw error;
    }
  }

  const value = useMemo(
    () => ({
      isChecked,
      currentUser,
      checkAuth,
      activate,
      login,
      logout,
      googleSignIn,
      gitHubSignIn,
    }),
    [currentUser, isChecked]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);
