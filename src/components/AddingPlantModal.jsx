import React from 'react';
import { Leaf, Sprout } from 'lucide-react';

const AddingPlantModal = ({ isOpen }) => {
  console.log('AddingPlantModal isOpen:', isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Urvann</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="h-8 w-8 text-green-600 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Adding Your Plant
            </h3>
            <p className="text-gray-600">
              Please wait while we add your plant to the inventory...
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Uploading image...</p>
            <p>Processing plant data...</p>
            <p>Adding to inventory...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingPlantModal;
