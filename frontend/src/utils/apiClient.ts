import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
