import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

//axios base for json type request and respose
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

//axios base for multipart such as image uploads
export const axiosMultipartInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: false,
});
