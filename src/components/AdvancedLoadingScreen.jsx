import React, { useState, useEffect } from 'react';
import { Leaf, Sprout, Droplets, Sun, Flower, TreePine } from 'lucide-react';

const AdvancedLoadingScreen = ({ 
  onLoadingComplete, 
  duration = 4000, 
  theme = 'nature',
  showProgress = true,
  customTexts = null 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [particles, setParticles] = useState([]);

  const defaultTexts = {
    nature: [
      "Planting seeds of joy...",
      "Growing your green paradise...",
      "Nurturing fresh beginnings...",
      "Almost ready to bloom...",
      "Sprouting new possibilities..."
    ],
    tech: [
      "Initializing systems...",
      "Loading components...",
      "Preparing interface...",
      "Almost ready...",
      "Launching application..."
    ]
  };

  const loadingTexts = customTexts || defaultTexts[theme] || defaultTexts.nature;

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 0.5 + 0.5
    }));
    setParticles(newParticles);
  }, []);

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
        return prev + (100 / (duration / 50));
      });
    }, 50);

    // Text rotation
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [duration, onLoadingComplete, loadingTexts.length]);

  const getThemeElements = () => {
    if (theme === 'nature') {
      return {
        icon: <Leaf className="h-10 w-10 text-white" />,
        floatingElements: [
          { icon: <Sun className="h-6 w-6 text-yellow-400" />, animation: 'animate-pulse' },
          { icon: <Droplets className="h-5 w-5 text-blue-400" />, animation: 'animate-bounce' },
          { icon: <Sprout className="h-5 w-5 text-green-500" />, animation: 'animate-pulse' },
          { icon: <Flower className="h-4 w-4 text-pink-400" />, animation: 'animate-bounce' }
        ]
      };
    }
    return {
      icon: <TreePine className="h-10 w-10 text-white" />,
      floatingElements: [
        { icon: <Sun className="h-6 w-6 text-yellow-400" />, animation: 'animate-pulse' },
        { icon: <Droplets className="h-5 w-5 text-blue-400" />, animation: 'animate-bounce' }
      ]
    };
  };

  const themeElements = getThemeElements();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center z-50 overflow-hidden">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-green-300 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            transform: `scale(${particle.size})`
          }}
        />
      ))}

      <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Main Container */}
        <div className="text-center relative">
          {/* Logo and Brand */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {themeElements.icon}
                </div>
                {/* Animated growing plant */}
                <div className="absolute -top-2 -right-2">
                  <div className="animate-bounce">
                    <Sprout className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-pulse">Urvann</h1>
            <p className="text-gray-600">Bringing Fresh Plants to Every Home</p>
          </div>

          {/* Animated Elements */}
          <div className="relative mb-8">
            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              {themeElements.floatingElements.map((element, index) => (
                <div
                  key={index}
                  className={`absolute ${element.animation}`}
                  style={{
                    animationDelay: `${index * 0.3}s`,
                    left: `${20 + index * 20}%`,
                    top: `${10 + (index % 2) * 60}%`
                  }}
                >
                  {element.icon}
                </div>
              ))}
            </div>

            {/* Growing Plant Animation */}
            <div className="flex items-end justify-center space-x-1 h-16">
              {[...Array(7)].map((_, index) => (
                <div
                  key={index}
                  className="w-1.5 bg-gradient-to-t from-green-600 to-green-300 rounded-full animate-pulse"
                  style={{
                    height: `${Math.max(6, (progress / 100) * 50 + index * 3)}px`,
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Loading Text */}
          <div className="mb-6 h-8">
            <p className="text-lg text-gray-700 font-medium transition-all duration-500 animate-pulse">
              {loadingTexts[currentText]}
            </p>
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <>
              <div className="w-64 mx-auto mb-4">
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-600 h-full rounded-full transition-all duration-300 ease-out shadow-sm"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Progress Percentage */}
              <p className="text-sm text-gray-500 font-medium">{Math.round(progress)}%</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedLoadingScreen;
