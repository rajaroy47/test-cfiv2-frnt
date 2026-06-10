import api from "../axios";

export const getRazorpayKey = async () => {
  const response = await api.get("/user/payment/key");

  return response.data;
};

export const processPayment = async (serviceId, plan) => {
  const response = await api.post("/user/payment/process", {
    serviceId,
    plan,
  });

  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post("/user/payment/verify", paymentData);

  return response.data;
};

export const getAllPayments = async () => {
  const response = await api.get("/user/my-payments");

  return response.data;
};


