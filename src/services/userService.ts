import { httpClient } from "../http/httpClient";
import { User } from "../types/users";

export const userService = {
  getAll: (): Promise<User[]> => httpClient.get('/users')
}