import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AdminHeader from '../components/AdminHeader'
import CreatingCategoryModal from '../components/CreatingCategoryModal'
import { adminApi } from '../APIServices/adminApi'
import { 
  Grid3X3, 
  Tag, 
  FileText, 
  ToggleLeft, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft,
  Plus
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [showCreatingCategoryModal, setShowCreatingCategoryModal] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      categoryName: '',
      description: '',
      isActive: true
    }
  })

  const fetchCategories = async () => {
    setIsLoadingCategories(true)
    try {
      const result = await adminApi.getAllCategories()
      if (result.success) {
        const categoriesData = result.data?.categories
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } else {
        console.error('Failed to fetch categories:', result.error)
        setCategories([])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    } finally {
      setIsLoadingCategories(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setSubmitStatus(null)
      setShowCreatingCategoryModal(true)
      
      const result = await adminApi.addCategory(data)
      
      if (result.success) {
        setSubmitStatus('success')
        reset()
        fetchCategories() // Refresh the categories list
      } else {
        setSubmitStatus('error')
        alert(`Error adding category: ${result.error}`)
      }
    } catch (error) {
      setSubmitStatus('error')
      alert('Error adding category. Please try again.')
    } finally {
      setIsSubmitting(false)
      setShowCreatingCategoryModal(false)
    }
  }

  return (
    <>
      <CreatingCategoryModal isOpen={showCreatingCategoryModal} />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <AdminHeader />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/adminDashboard')}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg shadow-sm">
              <Grid3X3 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-600">Add New Category</h1>
              <p className="text-gray-600 mt-1">Create a new plant category to organize your inventory</p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
                 {submitStatus === 'success' && (
           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
             <div className="flex items-center mb-3">
               <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
               <div>
                 <p className="text-green-800 font-medium">Category added successfully!</p>
                 <p className="text-green-600 text-sm">Your new category has been created!</p>
               </div>
             </div>
             <div className="flex gap-3">
               <button
                 onClick={() => {
                   setSubmitStatus(null)
                   reset()
                 }}
                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
               >
                 Add Another Category
               </button>
               <button
                 onClick={() => navigate('/adminDashboard')}
                 className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
               >
                 Back to Dashboard
               </button>
             </div>
           </div>
         )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
            <p className="text-red-800">Failed to add category. Please try again.</p>
          </div>
        )}

                 {/* Form Card */}
         {submitStatus !== 'success' && (
           <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mr-3 shadow-sm">
                <Grid3X3 className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-green-600">Category Information</h2>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Category Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-green-600" />
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Indoor Plants, Succulents, Flowering Plants"
                  {...register("categoryName", { 
                    required: "Category name is required",
                    minLength: { value: 2, message: "Category name must be at least 2 characters" },
                    maxLength: { value: 50, message: "Category name must be less than 50 characters" }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.categoryName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.categoryName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.categoryName.message}
                  </p>
                )}
              </div>

              {/* Category Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-green-600" />
                  Description
                </label>
                <textarea
                  placeholder="e.g., Plants that thrive in indoor environments with low to moderate light conditions. Perfect for home and office spaces."
                  rows="4"
                  {...register("description", { 
                    maxLength: { value: 500, message: "Description must be less than 500 characters" }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.description.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Optional: Provide a detailed description to help customers understand this category
                </p>
              </div>

              {/* Category Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <ToggleLeft className="h-4 w-4 mr-2 text-green-600" />
                  Category Status
                </label>
                <select
                  {...register("isActive")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value={true}>Active - Category will be visible to customers</option>
                  <option value={false}>Inactive - Category will be hidden from customers</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  You can change this status later from the dashboard
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors shadow-sm ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
                  }`}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Creating Category...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
        )}

        {/* Existing Categories Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mr-3 shadow-sm">
                <Tag className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-blue-600">Existing Categories</h2>
            </div>
          </div>
          
          <div className="p-6">
            {isLoadingCategories ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading categories...</p>
              </div>
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{category.categoryName}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        category.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {category.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No categories found</p>
                <p className="text-sm text-gray-400">Create your first category above</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Tips for Creating Categories
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Use clear, descriptive names that customers will understand
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Consider organizing by plant type, care difficulty, or environment
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Add helpful descriptions to guide customers in their plant selection
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              You can always edit or deactivate categories later from the dashboard
            </li>
          </ul>
                 </div>
       </div>
     </div>
     </>
   )
 }

export default AddCategory
