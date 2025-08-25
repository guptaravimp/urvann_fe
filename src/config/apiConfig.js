const getApiBaseUrl = () => {
  return 'https://urvann-bee.vercel.app/api/v1';
  // return 'http://localhost:5000/api/v1';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  PLANT_URL: `${getApiBaseUrl()}/plant`,
  UPLOAD_URL: `${getApiBaseUrl()}/upload`,
};

export default API_CONFIG;
