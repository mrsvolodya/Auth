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
