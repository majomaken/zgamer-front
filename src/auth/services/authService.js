import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const normalizeError = (error) => {
  const message = error.response?.data?.message ?? error.message ?? 'Error desconocido, por favor intente nuevamente';
  return new Error(message);
}

export const loginRequest = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export const registerRequest = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, payload);
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}