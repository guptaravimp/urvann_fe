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
   cd frontend
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

## 🎨 Components Overview

### Core Components

#### `PlantCard.jsx`
- Displays individual plant information
- Shows plant image, name, price, and availability
- Responsive design with hover effects

#### `AdminHeader.jsx`
- Navigation header for admin dashboard
- User authentication status
- Quick access to admin functions

#### `AddingPlantModal.jsx`
- Modal for adding new plants
- Form validation with React Hook Form
- Image upload integration

#### `CreatingCategoryModal.jsx`
- Modal for creating new plant categories
- Form handling and validation

#### `AdvancedLoadingScreen.jsx`
- Sophisticated loading animation
- Progress indicators and user feedback

### Page Components

#### `LandingPageWithAdvancedLoading.jsx`
- Main landing page with loading animation
- User introduction and navigation

#### `AdminDashboard.jsx`
- Complete admin interface
- Plant and category management
- Data visualization and controls

#### `Home.jsx`
- Main user-facing page
- Plant catalog display
- Search and filter functionality

#### `AddCategory.jsx`
- Category creation interface
- Form validation and submission

## 🔌 API Integration

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

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Styling & Design

### Tailwind CSS Configuration
The project uses Tailwind CSS for styling with custom configuration:

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

### Design System
- **Colors**: Consistent color palette for branding
- **Typography**: Readable font hierarchy
- **Spacing**: Consistent spacing system
- **Components**: Reusable component patterns

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized images and assets

## 🔒 Security Features

- Environment variable protection
- API key management
- Input validation and sanitization
- Secure file upload handling

## 🚀 Performance Optimization

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: Optimized image loading
- **Bundle Optimization**: Vite build optimization

## 🧪 Development Workflow

1. **Setup Development Environment**
   ```bash
   npm install
   npm run dev
   ```

2. **Code Quality**
   ```bash
   npm run lint
   ```

3. **Testing**
   - Manual testing of components
   - API integration testing
   - Responsive design testing

4. **Building for Production**
   ```bash
   npm run build
   npm run preview
   ```

## 🌐 Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure environment variables

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | Yes |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |

### Build Configuration
- **Vite**: Fast build tool with HMR
- **PostCSS**: CSS processing pipeline
- **ESLint**: Code quality and consistency

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check backend server is running
   - Verify API base URL in environment variables
   - Check CORS configuration

2. **Build Issues**
   - Clear node_modules and reinstall
   - Check for dependency conflicts
   - Verify Node.js version compatibility

3. **Styling Issues**
   - Check Tailwind CSS configuration
   - Verify PostCSS setup
   - Clear browser cache

## 📝 License

ISC License

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

## 🔗 Related Links

- [Backend API Documentation](./../Backend/README.md)
- [Project Repository](repository-url)
- [Live Demo](demo-url)
