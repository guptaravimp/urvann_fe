import React, { useState, useEffect } from 'react'
import { Truck, CheckCircle, ArrowRight, Filter, Search, Leaf } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PlantCard from '../components/PlantCard'
import AdvancedLoadingScreen from '../components/AdvancedLoadingScreen'
import { homeApi } from '../APIServices/homeApi'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [plants, setPlants] = useState([])
  const [allPlants, setAllPlants] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const getInitialCart = () => {
    try {
      const savedCart = localStorage.getItem('urvannCart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error parsing cart data:', error)
      localStorage.removeItem('urvannCart')
      return []
    }
  }

  const [cartItems, setCartItems] = useState(getInitialCart)
  const [showCartFeedback, setShowCartFeedback] = useState(false)






  useEffect(() => {
    localStorage.setItem('urvannCart', JSON.stringify(cartItems))
  }, [cartItems])


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {

        const plantsResult = await homeApi.getAllPlants()
        console.log("plants result is ",plantsResult)
        if (plantsResult.success) {
          const fetchedPlants = plantsResult.data.plants ;
          setAllPlants(fetchedPlants)
          setPlants(fetchedPlants)
        } else {
          console.error('Failed to fetch plants:', plantsResult.error)
          setError('Failed to fetch plants')
        }


        const categoriesResult = await homeApi.getAllCategories()
        console.log("categories result is ",categoriesResult)
        if (categoriesResult.success) {
          setCategories(categoriesResult.data.categories )
        } else {
          console.error('Failed to fetch categories:', categoriesResult.error)
          setError('Failed to fetch categories')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data')
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    }

    fetchData()
  }, [])


  const handleSearch = async (e) => {
    const query = e.target.value.trim()
    setSearchQuery(e.target.value)

    if (query.length >= 2) {
      try {
        const result = await homeApi.searchPlants(query)
        if (result.success) {
          setPlants(result.data.plants || result.data || [])
        }
      } catch (error) {
        console.error('Error searching plants:', error)
      }
    } else if (query.length === 0) {
      setPlants(allPlants)
    }
  }




  const addToCart = (plant) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === plant._id)
      if (existingItem) {
        return prevItems.map(item =>
          item._id === plant._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...plant, quantity: 1 }]
      }
    })


    setShowCartFeedback(true)
    setTimeout(() => setShowCartFeedback(false), 2000)
  }

  const removeFromCart = (plantId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== plantId))
  }

  const updateQuantity = (plantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(plantId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === plantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const isInCart = (plantId) => {
    return cartItems.some(item => item._id === plantId)
  }

  const getCartItemQuantity = (plantId) => {
    const item = cartItems.find(item => item._id === plantId)
    return item ? item.quantity : 0
  }

  const handleBuyNow = (plant) => {
    if (!isInCart(plant._id)) {
      addToCart(plant)
    }
    alert(`Proceeding to checkout for ${plant.plantName}`)
  }




  const handleCategoryFilter = async (e) => {
    const categoryId = e.target.value
    setCategoryFilter(categoryId)

    if (categoryId) {
      try {
        const result = await homeApi.getPlantsByCategory(categoryId)
        if (result.success) {
          const categoryPlants = result.data.plants || result.data || []
          setAllPlants(categoryPlants)
          setPlants(categoryPlants)
        }
      } catch (error) {
        console.error('Error filtering plants by category:', error)
      }
    } else {
      try {
        const result = await homeApi.getAllPlants()
        if (result.success) {
          const allFetchedPlants = result.data.plants || result.data || []
          setAllPlants(allFetchedPlants)
          setPlants(allFetchedPlants)
        }
      } catch (error) {
        console.error('Error fetching all plants:', error)
      }
    }
  }

    return (
    <>
      {isLoading ? (
        <AdvancedLoadingScreen 
          onLoadingComplete={() => {}} 
          duration={3000}
          theme="nature"
          showProgress={true}
          customTexts={[
            "Loading your plant paradise...",
            "Fetching fresh greens...",
            "Preparing your shopping experience...",
            "Almost ready to explore..."
          ]}
        />
      ) : (
        <div className="min-h-screen bg-white">

      {showCartFeedback && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Added to cart!</span>
          </div>
        </div>
      )}




      <Header cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />


      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Your Perfect
              <span className="text-green-600"> Plant Companion</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              From air-purifying wonders to stunning statement pieces, find the perfect plant to transform your space.
            </p>


            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by plant name..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={handleCategoryFilter}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => {


                      return (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      <section className="py-4 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Plants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Carefully selected plants that will thrive in your home and bring life to your space
            </p>
            {!isLoading && !error && (
              <div className="text-sm text-gray-500">
                Showing {plants.length} of {allPlants.length} plants
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row flex-wrap justify-center gap-8">
            {error ? (
              <div className="w-full text-center py-12">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-red-500 text-4xl">⚠️</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <p className="text-gray-600">Please try again later</p>
              </div>
            ) : plants.length === 0 ? (
              <div className="w-full text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No plants found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('');
                    setPlants(allPlants);
                  }}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              plants.map((plant) => (
                <PlantCard
                  key={plant._id}
                  plant={plant}
                  categories={categories}
                  isInCart={isInCart}
                  getCartItemQuantity={getCartItemQuantity}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  handleBuyNow={handleBuyNow}
                />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto">
              View All Plants
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>


      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Urvann?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make plant shopping simple, reliable, and enjoyable
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Next Day Delivery</h3>
              <p className="text-gray-600">
                Free delivery to your doorstep within 24 hours of ordering
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Every plant is carefully selected and guaranteed to thrive
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Care</h3>
              <p className="text-gray-600">
                Detailed care instructions and expert support for every plant
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who have brought life to their homes with Urvann
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center mx-auto">
            Start Shopping Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>


      <Footer />
        </div>
      )}
    </>
  )
}

export default Home