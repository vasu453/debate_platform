import axios from "axios";

const API = axios.create({
  baseURL: "https://debate-platform-wzm3.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // 🔥 IMPORTANT
  }
  console.log("API CALL:", req.baseURL + req.url);

  return req;
});

export default API;