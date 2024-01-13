import axios from "axios";
import { BASE_URL } from "../config"; // app Base URL for FrontEnd

const axiosInstance = axios.create({ baseURL: BASE_URL });
axios.defaults.withCredentials = true;

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");

  //checking if accessToken exists
  if (accessToken) {
    config.headers["authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// modifies the request config before it is sent, and axiosInstance.interceptors.response.use()
// to add a function that handles the response data or error after it is received.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went Wrong"
    )
);

export default axiosInstance;
