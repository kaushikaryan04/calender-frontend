import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8000/",
  baseURL: "https://calender-backend-kbs7.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          window.location.href = "/";
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          "https://calender-backend-kbs7.onrender.com/api/token/refresh",
          {
            refresh: refreshToken,
          },
        );

        const newAccessToken = response.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Failed to refresh token", err);

        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
