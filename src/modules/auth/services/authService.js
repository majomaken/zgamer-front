import httpClient from "../../../shared/utils/httpClient";

const normalizeError = (error) => {
  if (error.response?.data?.errors) {
    return error.response.data.errors;
  }

  const message = error.response?.data?.message ?? error.message ?? 'Error desconocido, por favor intente nuevamente';
  console.log('error', error);
  return new Error(message);
}

export const loginRequest = async (credentials) => {
  try {
    const response = await httpClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export const registerRequest = async (payload) => {
  try {
    const response = await httpClient.post('/auth/register', payload);
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}