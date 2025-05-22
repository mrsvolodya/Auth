import axios from "axios";

// this client does not have auth interceptors
export const authClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

// to awoid getting `res.data` everywhere
authClient.interceptors.response.use((res) => res.data);
