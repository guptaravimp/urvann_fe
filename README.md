## 🛠️ Tech Stack

- **Framework**: React 19.1.1 with Vite 7.1.2
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Redux Toolkit 2.8.2
- **Routing**: React Router DOM 7.8.2
- **Forms**: React Hook Form 7.62.0
- **Notifications**: React Hot Toast 2.6.0
- **Icons**: Lucide React 0.541.0
- **Development**: ESLint 9.33.0, PostCSS 8.5.6

## 📋 Prerequisites

- Node.js (>=16.0.0)
- npm (>=8.0.0)
- Backend API running (see Backend README)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/guptaravimp/urvann_fe.git
   cd urvann_fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```



## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── APIServices/        # API service functions
│   │   ├── adminApi.js     # Admin-related API calls
│   │   └── homeApi.js      # Home page API calls
│   ├── assets/             # Images, icons, and static files
│   ├── components/         # Reusable React components
│   │   ├── AddingPlantModal.jsx
│   │   ├── AdminHeader.jsx
│   │   ├── AdvancedLoadingScreen.jsx
│   │   ├── CreatingCategoryModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── PlantCard.jsx
│   ├── config/
│   │   └── apiConfig.js    # API configuration
│   ├── pages/              # Page components
│   │   ├── AddCategory.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Home.jsx
│   │   ├── landingPage.jsx
│   │   └── LandingPageWithAdvancedLoading.jsx
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main App component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Application entry point
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite build configuration
└── eslint.config.js        # ESLint configuration
```



### API Services Structure

#### `adminApi.js`
```javascript
// Admin-related API calls
- getPlants()
- createPlant(plantData)
- updatePlant(id, plantData)
- deletePlant(id)
- getCategories()
- createCategory(categoryData)
```

#### `homeApi.js`
```javascript
// Home page API calls
- getPlants()
- getCategories()
- searchPlants(query)
```

### Configuration

#### `apiConfig.js`
```javascript
// API base URL configuration
// Error handling setup
// Request/response interceptors
```



```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Custom colors, fonts, and spacing
    }
  },
  plugins: []
}
```


