import React, { useState } from 'react'
import { Leaf, Search, ShoppingCart, Heart, User } from 'lucide-react'
import { Link } from 'react-router-dom'
const Header = ({ cartCount = 0 }) => {

 
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Urvann</span>
              </div>
            </div>
          </div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/home" className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="/home/shopstore" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop Store</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
           

            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600 flex items-center gap-1 transition-colors">
              <User className="h-5 w-5" /><span>Ravi Gupta</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
