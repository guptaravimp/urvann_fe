import React, { useState, useEffect } from 'react';
import { Leaf, Sprout, Droplets, Sun } from 'lucide-react';

const LoadingScreen = ({ onLoadingComplete, duration = 3000 }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const loadingTexts = [
    "Planting seeds of joy...",
    "Growing your green paradise...",
    "Nurturing fresh beginnings...",
    "Almost ready to bloom..."
  ];

  useEffect(() => {
    // Show content with fade-in animation
    const timer = setTimeout(() => setShowContent(true), 100);
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onLoadingComplete && onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    // Text rotation
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [duration, onLoadingComplete, loadingTexts.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center z-50">
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main Container */}
        <div className="text-center">
          {/* Logo and Brand */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                {/* Animated growing plant */}
                <div className="absolute -top-2 -right-2">
                  <div className="animate-bounce">
                    <Sprout className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Urvann</h1>
            <p className="text-gray-600">Bringing Fresh Plants to Every Home</p>
          </div>

          {/* Animated Elements */}
          <div className="relative mb-8">
            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse">
                <Sun className="h-8 w-8 text-yellow-400 absolute -top-4 left-1/4" />
              </div>
              <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Droplets className="h-6 w-6 text-blue-400 absolute top-4 right-1/4" />
              </div>
              <div className="animate-pulse" style={{ animationDelay: '1s' }}>
                <Leaf className="h-5 w-5 text-green-500 absolute -bottom-2 left-1/3" />
              </div>
            </div>

            {/* Growing Plant Animation */}
            <div className="flex items-end justify-center space-x-2 h-16">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-2 bg-gradient-to-t from-green-600 to-green-300 rounded-full animate-pulse"
                  style={{
                    height: `${Math.max(8, (progress / 100) * 40 + index * 4)}px`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Loading Text */}
          <div className="mb-6 h-8">
            <p className="text-lg text-gray-700 font-medium transition-opacity duration-500">
              {loadingTexts[currentText]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto mb-4">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Progress Percentage */}
          <p className="text-sm text-gray-500">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
