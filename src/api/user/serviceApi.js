import api from "../axios";

export const getServiceStatus = async (serviceId) => {
  if (!serviceId) return null; // Safety check
  const response = await api.get(`/user/service-status/${serviceId}`);
  return response.data;
};