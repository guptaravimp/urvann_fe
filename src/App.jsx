import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageWithAdvancedLoading from './pages/LandingPageWithAdvancedLoading'
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/AddCategory';
import Home from './pages/Home';

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageWithAdvancedLoading/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>}/>
      <Route path="/addCategory" element={<AddCategory/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/shopstore" element={<Home/>}/>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
