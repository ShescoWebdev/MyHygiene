import axios from "axios";

 export const BASE_URL = "https://myhygiene.onrender.com";
 
const API = axios.create({ baseURL: `${BASE_URL}/api` });

// Attachs token automatically
API.interceptors.request.use((req) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo?.token) {
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return req;
});

export default API;