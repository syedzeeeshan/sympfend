import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Backend health check
  checkHealth: () => api.get('/health/'),
  
  // Brochures with pagination
  getBrochures: (page = 1) => api.get(`/brochures/?page=${page}`),
  
  // Events timeline
  getEvents: () => api.get('/events/'),
  
  // Team leaders
  getTeamLeaders: () => api.get('/team/'),
  
  // Registration flow
  createRegistration: (data) => api.post('/registration/create/', data),
  getRegistration: (registrationId) => api.get(`/registration/${registrationId}/`),
  
  // Razorpay payment integration
  createRazorpayOrder: (registrationId) => 
    api.post('/payment/create-order/', { registration_id: registrationId }),
  
  verifyRazorpayPayment: (paymentData) => 
    api.post('/payment/verify/', paymentData),
};

export default api;
