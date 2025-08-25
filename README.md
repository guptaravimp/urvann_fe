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
   Create a `src/config/config.js` file in the root directory:
   change the backend base url to local in this page 
   ```
     const getApiBaseUrl = () => {
   // return 'https://urvann-be.vercel.app/api/v1';
   return 'http://localhost:5000/api/v1';
   }:
 4, **Run the app
 ```
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


