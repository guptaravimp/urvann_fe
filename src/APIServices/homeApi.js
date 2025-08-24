import { API_CONFIG } from '../config/apiConfig';

export const homeApi = {
  // Get all plants - using the actual backend route
  getAllPlants: async () => {
    try {
      const response = await fetch(`${API_CONFIG.PLANT_URL}/getAllPlants`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (response.ok) {
        return {
          success: true,
          data: data
        }
      } else {
        return {
          success: false,
          error: data.message || 'Failed to fetch plants'
        }
      }
    } catch (error) {
      console.error('Error fetching plants:', error)
      return {
        success: false,
        error: 'Network error or server not responding'
      }
    }
  },

  // Search plants - new function for server-side search
  searchPlants: async (query) => {
    try {
      const response = await fetch(`${API_CONFIG.PLANT_URL}/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (response.ok) {
        return {
          success: true,
          data: data
        }
      } else {
        return {
          success: false,
          error: data.message || 'Failed to search plants'
        }
      }
    } catch (error) {
      console.error('Error searching plants:', error)
      return {
        success: false,
        error: 'Network error or server not responding'
      }
    }
  },

  // Get plants by category - using the actual backend route
  getPlantsByCategory: async (categoryId) => {
    try {
      const response = await fetch(`${API_CONFIG.PLANT_URL}/getAllPlantByCategory?categoryId=${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (response.ok) {
        return {
          success: true,
          data: data
        }
      } else {
        return {
          success: false,
          error: data.message || 'Failed to fetch plants by category'
        }
      }
    } catch (error) {
      console.error('Error fetching plants by category:', error)
      return {
        success: false,
        error: 'Network error or server not responding'
      }
    }
  },

 
  // Get all categories - using the actual backend route
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_CONFIG.PLANT_URL}/getAllCategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (response.ok) {
        return {
          success: true,
          data: data
        }
      } else {
        return {
          success: false,
          error: data.message || 'Failed to fetch categories'
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      return {
        success: false,
        error: 'Network error or server not responding'
      }
    }
  }
}
