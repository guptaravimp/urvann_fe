import React from 'react'
import { Star, Heart, ShoppingCart, Trash2 } from 'lucide-react'

const PlantCard = ({ 
  plant, 
  categories, 
  isInCart, 
  getCartItemQuantity, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  handleBuyNow 
}) => {
  // Get category names - handle multiple categories
  let categoryNames = ['Unknown'];
  if (plant.plantCategories && Array.isArray(plant.plantCategories)) {
    categoryNames = plant.plantCategories.map(cat => 
      typeof cat === 'object' ? cat.categoryName : 
      categories.find(c => c._id === cat)?.categoryName || 'Unknown'
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group w-full md:w-80 lg:w-80 border border-gray-100">
      <div className="relative">
        <div
          className="w-full h-64 bg-center bg-no-repeat bg-cover group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url("${plant.plantImage}")` }}
        />

        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-md ${
            plant.plantAvailability === 'In Stock'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {plant.plantAvailability}
          </span>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-16 right-4">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 break-words">
            {plant.plantName}
          </h3>
          <div className="flex flex-wrap gap-1">
            {categoryNames.map((categoryName, index) => (
              <span 
                key={index} 
                className="px-1.5 py-0.5 bg-orange-500 text-white text-xs font-medium rounded-full shadow-sm"
              >
                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
              </span>
            ))}
          </div>
        </div>
        
        <p 
          className="text-gray-600 mb-4 text-sm leading-relaxed break-words" 
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {plant.plantDescription}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-green-600">
            ₹{plant.plantPrice.toLocaleString()}
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <span className="text-gray-600 text-xs ml-1">(4.8)</span>
          </div>
        </div>

        {isInCart(plant._id) ? (
          <div className="space-y-2">
            <button
              onClick={() => handleBuyNow(plant)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center group-hover:shadow-lg"
            >
              Buy Now
              <ShoppingCart className="ml-1 h-3 w-3" />
            </button>
            <button
              onClick={() => removeFromCart(plant._id)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              Remove
              <Trash2 className="ml-1 h-3 w-3" />
            </button>
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => updateQuantity(plant._id, getCartItemQuantity(plant._id) - 1)}
                className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm"
              >
                -
              </button>
              <span className="text-xs text-gray-600 min-w-[1.5rem] text-center">
                {getCartItemQuantity(plant._id)}
              </span>
              <button
                onClick={() => updateQuantity(plant._id, getCartItemQuantity(plant._id) + 1)}
                className="w-6 h-6 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => addToCart(plant)}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center group-hover:shadow-lg"
          >
            Add to Cart
            <ShoppingCart className="ml-1 h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}

export default PlantCard
