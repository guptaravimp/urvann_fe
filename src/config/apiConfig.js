// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in production
  if (import.meta.env.PROD) {
    // For production, use environment variable or default to your deployed backend URL
    return import.meta.env.VITE_API_URL || 'https://your-backend-domain.com/api/v1';
  }
  
  // For development, use localhost
  return 'http://localhost:5000/api/v1';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  PLANT_URL: `${getApiBaseUrl()}/plant`,
  UPLOAD_URL: `${getApiBaseUrl()}/upload`,
};

export default API_CONFIG;
