import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export function getErrorMessage(
  error: unknown,
  fallback = "Failed to update"
): string {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return axiosError.response?.data?.message ?? fallback;
  }
  return fallback;
}
