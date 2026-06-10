import api from "../axios";

// Get user profile
export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

// Update user profile (supports both JSON and FormData for file uploads)
export const updateProfile = async (profileData) => {
  // Check if FormData is being sent (for file uploads)
  if (profileData instanceof FormData) {
    const response = await api.put("/user/profile", profileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
  
  // For JSON data
  const response = await api.put("/user/profile", profileData);
  return response.data;
};

// Update avatar only
export const updateAvatar = async (formData) => {
  const response = await api.put("/user/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Change password
export const changePassword = async (passwordData) => {
  const response = await api.put("/user/change-password", passwordData);
  return response.data;
};

// Get all payments
export const getAllPayments = async () => {
  const response = await api.get("/user/payments");
  return response.data;
};

// Get service status
export const getServiceStatus = async (serviceId) => {
  if (!serviceId) return null;
  const response = await api.get(`/user/service-status/${serviceId}`);
  return response.data;
};