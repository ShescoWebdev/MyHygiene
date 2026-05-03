import axios from "axios";

const API = axios.create({
  baseURL: " https://myhygiene.onrender.com/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo?.token) {
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return req;
});

export default API;