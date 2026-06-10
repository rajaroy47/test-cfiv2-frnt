// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true,
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try refresh again for refresh endpoint itself
    if (
      originalRequest?.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        return api(originalRequest);
      } catch (refreshError) {
        // Just reject
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;