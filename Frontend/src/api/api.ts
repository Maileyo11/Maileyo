import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

export const getMessages = async () => {
  const response = await api.get('/messages');
  return response.data;
};