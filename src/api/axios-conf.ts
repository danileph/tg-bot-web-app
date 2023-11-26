import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../lib/consts";

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

// api.interceptors.request.use((confing) => {
//   const token = getTokenFromCookies();
//   if (token) {
//     confing.headers.Authorization = `Bearer ${token}`;
//   }
//   return confing;
// });

export { api };
