import React, { useState, useEffect } from 'react';
import AdvancedLoadingScreen from '../components/AdvancedLoadingScreen';
import LandingPage from './landingPage';

const LandingPageWithAdvancedLoading = () => {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showLoading) {
        handleLoadingComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [showLoading]);

  if (showLoading) {
    return (
      <AdvancedLoadingScreen 
        onLoadingComplete={handleLoadingComplete} 
        duration={4000}
        theme="nature"
        showProgress={true}
        customTexts={[
          "Welcome to Urvann...",
          "Growing your plant paradise...",
          "Preparing fresh greens for you...",
          "Almost ready to bloom..."
        ]}
      />
    );
  }

  return <LandingPage />;
};

export default LandingPageWithAdvancedLoading;
