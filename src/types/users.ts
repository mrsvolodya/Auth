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
  confirmPassword: string;
}
