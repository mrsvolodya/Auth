import { AxiosError } from "axios";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  password: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
}

export interface NameFormValues {
  firstName: string;
  lastName: string;
}

export interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

export interface EmailFormValues {
  newEmail: string;
  password: string;
}

export type Loader = Record<"fullName" | "password" | "email", boolean>;
export type ErrorsMessage = Record<
  "nameError" | "passwordError" | "emeilError",
  string
>;

export type AuthMode = "signin" | "signup";
export interface GoogleAuthProps {
  mode?: "icon" | "standard";
  authMode?: AuthMode;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface AuthContextType {
  isChecked: boolean;
  currentUser: User | null;
  checkAuth: () => Promise<void>;
  activate: (token: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  gitHubSignIn: (_code: string) => Promise<void>;
  googleSignIn: (token: string) => Promise<void>;
}

export type RegistrationError = AxiosError<{
  errors?: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    confirmPassword?: string;
  };
  message: string;
}>;

// First, let's define a type for our form values
export type RegistrationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
