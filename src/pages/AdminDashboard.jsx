import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import AdvancedLoadingScreen from '../components/AdvancedLoadingScreen'
import AddingPlantModal from '../components/AddingPlantModal'
import { adminApi } from '../APIServices/adminApi'
import { Leaf, Plus, BarChart3, Package, Users, TrendingUp, Upload, CheckCircle, AlertCircle, Sprout, Image, Package2, Tag, FileText, CloudUpload } from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  const [showAddingModal, setShowAddingModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      plantName: '',
      plantPrice: '',
      plantDescription: '',
      plantCategories: [],
      plantAvailability: true
    }
  })

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const result = await adminApi.getAllCategories()
      console.log("result is ",result)
      if (result.success) {
        const categoriesData = result.data?.categories ;
        console.log("categories data is ",categoriesData)
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } else {
        console.error('Failed to fetch categories:', result.error)
        setCategories([])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])


  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }


  const isCategorySelected = (categoryId) => {
    return selectedCategories.includes(categoryId)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a JPEG, JPG, PNG, or WebP image.')
        e.target.value = ''
        return
      }
      
      setSelectedFile(file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a JPEG, JPG, PNG, or WebP image.')
        return
      }
      
      setSelectedFile(file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateCategory = async () => {
    navigate('/addCategory')
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmittingForm(true)
      setShowAddingModal(true)
      console.log('Modal should be visible now:', true)
      

      if (selectedCategories.length === 0) {
        alert('Please select at least one category')
        setIsSubmittingForm(false)
        setShowAddingModal(false)
        return
      }
      
      console.log('Selected categories:', selectedCategories)
      console.log('Form data:', data)
      

      let imageUrl = ''
      if (selectedFile) {
        const uploadResult = await adminApi.uploadImage(selectedFile)
        if (uploadResult.success) {
          imageUrl = uploadResult.data.imageUrl
        } else {
          alert(`Error uploading image: ${uploadResult.error}`)
          setIsSubmittingForm(false)
          setShowAddingModal(false)
          return
        }
      } else {
        alert('Please select an image for the plant')
        setIsSubmittingForm(false)
        setShowAddingModal(false)
        return
      }


      const plantData = {
        ...data,
        plantCategories: selectedCategories,
        plantImage: imageUrl,
        usertype: 'admin'
      }

      console.log('Plant data being sent to backend:', plantData)


      const result = await adminApi.addPlant(plantData)
      
      console.log('Backend response:', result)
      
      if (result.success) {
        reset()
        setSelectedFile(null)
        setImagePreview(null)
        setSelectedCategories([])

      } else {
        console.error('Failed to add plant:', result.error)
        alert(`Error adding plant: ${result.error}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error adding plant. Please try again.')
    } finally {
      setIsSubmittingForm(false)
      setShowAddingModal(false)
    }
  }

  return (
    <>
      <AddingPlantModal isOpen={showAddingModal} />
      {isLoading ? (
        <AdvancedLoadingScreen 
          onLoadingComplete={() => {}} 
          duration={3000}
          theme="nature"
          showProgress={true}
          customTexts={[
            "Loading admin dashboard...",
            "Preparing your management tools...",
            "Setting up plant inventory...",
            "Almost ready to manage..."
          ]}
        />
      ) : (
        <div className="min-h-screen bg-white">

      <AdminHeader />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your plant inventory and track business performance</p>
        </div>


       


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mr-3 shadow-sm">
                    <Sprout className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-green-600">Add New Plant</h2>
                </div>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-green-600" />
                      Plant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Fiddle Leaf Fig"
                      {...register("plantName", { 
                        required: "Plant name is required",
                        minLength: { value: 2, message: "Plant name must be at least 2 characters" }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.plantName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.plantName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.plantName.message}
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-green-600" />
                      Plant Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 25.00"
                      step="0.01"
                      min="0"
                      {...register("plantPrice", { 
                        required: "Plant price is required",
                        min: { value: 0, message: "Price must be positive" },
                        pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Please enter a valid price" }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.plantPrice ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.plantPrice && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.plantPrice.message}
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Image className="h-4 w-4 mr-2 text-green-600" />
                      Plant Image <span className="text-red-500">*</span>
                    </label>
                    

                    <div 
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                        selectedFile 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="plant-image-upload"
                      />
                      
                      {selectedFile ? (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              Click or drag to replace
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <CloudUpload className="h-8 w-8 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, JPEG, WebP supported
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!selectedFile && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Plant image is required
                      </p>
                    )}
                  </div>


                  {imagePreview && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Image className="h-4 w-4 mr-2 text-green-600" />
                        Image Preview
                      </label>
                      <div className="w-40 h-40 border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <img 
                          src={imagePreview} 
                          alt="Plant preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-green-600" />
                      Plant Description
                    </label>
                    <textarea
                      placeholder="e.g., Low maintenance, air purifying plant perfect for indoor spaces"
                      rows="3"
                      {...register("plantDescription", { 
                        maxLength: { value: 500, message: "Description must be less than 500 characters" }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.plantDescription ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.plantDescription && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.plantDescription.message}
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Package2 className="h-4 w-4 mr-2 text-green-600" />
                      Plant Categories <span className="text-red-500">*</span>
                    </label>
                    
                    {categories && categories.length > 0 ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {categories.map((category) => (
                            <button
                              key={category._id}
                              type="button"
                              onClick={() => handleCategoryToggle(category._id)}
                              className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                                isCategorySelected(category._id)
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                              }`}
                            >
                              {category.categoryName}
                            </button>
                          ))}
                        </div>
                        
                        {selectedCategories.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">Selected categories:</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedCategories.map((categoryId) => {
                                const category = categories.find(cat => cat._id === categoryId)
                                return (
                                  <span
                                    key={categoryId}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                                  >
                                    {category?.categoryName}
                                    <button
                                      type="button"
                                      onClick={() => handleCategoryToggle(categoryId)}
                                      className="ml-2 text-green-600 hover:text-green-800"
                                    >
                                      ×
                                    </button>
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                        <p className="text-gray-500">No categories available</p>
                      </div>
                    )}
                    
                    {selectedCategories.length === 0 && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Please select at least one category
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Package className="h-4 w-4 mr-2 text-green-600" />
                      Plant Availability
                    </label>
                    <select
                      {...register("plantAvailability")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>


                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || isSubmittingForm || !selectedFile || selectedCategories.length === 0}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors shadow-sm ${
                        isSubmitting || isSubmittingForm || !selectedFile || selectedCategories.length === 0
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
                      }`}
                    >
                      <Sprout className="h-4 w-4 mr-2" />
                      {isSubmitting || isSubmittingForm ? 'Adding Plant...' : 'Add Plant'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>


          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-green-600 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleCreateCategory}
                  className="w-full flex items-center justify-between p-3 text-left bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-green-800">Add Category</p>
                    <p className="text-sm text-green-600">Create new plant category</p>
                  </div>
                  <Plus className="h-5 w-5 text-green-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 text-left bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                  <div>
                    <p className="font-medium text-blue-800">View Orders</p>
                    <p className="text-sm text-blue-600">Check recent orders</p>
                  </div>
                  <Package className="h-5 w-5 text-blue-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 text-left bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                  <div>
                    <p className="font-medium text-purple-800">Analytics</p>
                    <p className="text-sm text-purple-600">View detailed reports</p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </button>
              </div>
            </div>


           
          </div>
        </div>
      </div>
        </div>
      )}
    </>
  )
}

export default AdminDashboard;