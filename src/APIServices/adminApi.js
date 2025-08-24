import { API_CONFIG } from '../config/apiConfig';

// Admin API Service
export const adminApi = {
  // Upload image to Cloudinary
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('imagefiles', file);
      formData.append('name', 'plant-image');
      formData.append('tags', 'plant');
      formData.append('email', 'admin@planty.com');

      const response = await fetch(`${API_CONFIG.UPLOAD_URL}/imageUpload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('HTTP Error Response:', data);
        return { success: false, error: data.message || `HTTP error! status: ${response.status}` };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, error: error.message };
    }
  },

  // Add a new plant
  addPlant: async (plantData) => {
    try {
      const response = await fetch(`${API_CONFIG.PLANT_URL}/addPlant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.message || `HTTP error! status: ${response.status}` };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error adding plant:', error);
      return { success: false, error: error.message };
    }
  },

  // Add a new category
  addCategory: async (categoryData) => {
    try {
      const response = await fetch(`${API_CONFIG.PLANT_URL}/addCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_CONFIG.PLANT_URL}/getAllCategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, error: error.message };
    }
  },

  
};

export default adminApi;
