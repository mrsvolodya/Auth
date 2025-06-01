import { authClient as client } from "../http/authClient";
import { User } from "../types/users";

interface AuthData {
  accessToken: string;
  user: User;
}

export const authService = {
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    return client.post("/registration", {
      firstName,
      lastName,
      email,
      password,
    });
  },

  activate: (token: string): Promise<AuthData> => {
    return client.get(`/activation/${token}`);
  },

  login: (email: string, password: string): Promise<AuthData> => {
    return client.post("/login", { email, password });
  },

  logout: () => client.post("/logout"),

  refresh: (): Promise<AuthData> => client.get("/refresh"),

  requestPasswordReset: (email: string) => {
    return client.post("/reset-password", { email });
  },

  confirmPasswordReset: (token: string, password: string) => {
    return client.post(`/reset-password/${token}`, { password });
  },

  googleSignIn: (credential: string): Promise<AuthData> => {
    return client.post("/google", { credential });
  },

  gitHubSingIn: (code: string): Promise<AuthData> => {
    return client.post("/auth/github/callback", { code });
  },
};
