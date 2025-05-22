import { httpClient } from "../http/httpClient";
import {
  EmailFormValues,
  NameFormValues,
  PasswordFormValues,
  User,
} from "../types/users";

export const userService = {
  getAll: (): Promise<User[]> => httpClient.get("/users"),
  updateName: (values: NameFormValues): Promise<User> => {
    const { firstName, lastName } = values;
    return httpClient.patch("/users/me", { firstName, lastName });
  },
  updatePassword: (values: PasswordFormValues): Promise<PasswordFormValues> => {
    const { oldPassword, newPassword, confirmPassword } = values;
    return httpClient.patch("/users/me/password", {
      oldPassword,
      newPassword,
      confirmPassword,
    });
  },
  updateEmail: (values: EmailFormValues): Promise<EmailFormValues> => {
    const { newEmail, password } = values;

    return httpClient.patch("/users/me/email", { newEmail, password });
  },

  confirmEmailChange: (
    token: string
  ): Promise<{ user: User; accessToken: string }> => {
    return httpClient.get(`/users/me/confirm-email-change/${token}`);
  },
};
