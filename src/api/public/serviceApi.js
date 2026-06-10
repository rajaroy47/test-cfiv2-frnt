import api from "../axios";

export const getAllServices = async () => {
  const response = await api.get("/public/services");

  return response.data;
};

export const getServiceBySlug = async (slug) => {
  const response = await api.get(`/public/services/${slug}`);

  return response.data;
};

export const getServicePlans = async (serviceId) => {
  const response = await api.get(`/public/service-plans/${serviceId}`);

  return response.data;
};
