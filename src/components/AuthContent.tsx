import React, { useMemo, useState } from "react";
import { User } from "../types/users";
import { authService } from "../services/authService";
import { accessTokenService } from "../services/accessTokenService";

/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext({
  isChecked: false,
  currentUser: null as User | null,
  checkAuth: async () => {},
  activate: async (_token: string) => {},
  login: async (_email: string, _password: string) => {},
  logout: async () => {},
});
/* eslint-enamble @typescript-eslint/no-unused-vars */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isChecked, setChecked] = useState(true);

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
      console.log("User is not authenticated");
    } finally {
      setChecked(true);
    }
  }

  async function login(email: string, password: string) {
    const { accessToken, user } = await authService.login(email, password);

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setCurrentUser(null);
  }

  const value = useMemo(
    () => ({
      isChecked,
      currentUser,
      checkAuth,
      activate,
      login,
      logout,
    }),
    [currentUser, isChecked]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);
