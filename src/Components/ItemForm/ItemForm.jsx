import React, { useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
import { addItem } from '../../Service/ItemService'

function ItemForm() {
  const {Categories, setItemsData, itemsData, setCategories} = React.useContext(AppContext)
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  })
 
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("item", JSON.stringify(data))
    formData.append("file", image)
    console.log(formData)
    try {
      if(!image){
        toast.error("Select image");
        return;
      }
     const response=await addItem(formData)
     if(response.status===201){
       setItemsData([...itemsData, response.data])
      setCategories((prevCategories)=>
      prevCategories.map((category) =>
        category.categoryId === data.categoryId
          ? { ...category, items: [...category.items, response.data] }
          : category
      )
      )
      toast.success("Item added successfully");
      setData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
      })
      setImage(false)
     }else{
      toast.error("Unable to add item");
     }
    } catch (error) {
      console.log(error);
      toast.error("Error adding item");
      
    }finally{
      setLoading(false)
    }
  
  }

  return (
    <div className="max-w-full mx-auto h-full p-2">
      <div className="bg-white text-black rounded-lg shadow-md p-4">
        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                <img 
                  src={image ? URL.createObjectURL(image) : "/src/assets/logo.png"} 
                  alt={image ? "Preview" : "Default"} 
                  className={image ? "w-full h-full object-cover" : "w-full h-full object-contain p-2"}
                />
              </div>
              <div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="px-2 py-1 text-xs font-semibold border border-orange-600 text-black rounded-md cursor-pointer hover:bg-orange-50 transition-colors"
                >
                  Upload Image
                </label>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter item name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Category Field */}
          <div className="mb-3">
            <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="categoryId"
              value={data.categoryId}
              onChange={onChangeHandler}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">-- Select Category --</option>
              {Categories?.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Field */}
          <div className="mb-3">
            <label htmlFor="price" className="block text-xs font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="₹ 0.00"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={data.description}
              onChange={onChangeHandler}
              placeholder="Enter item description"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-400"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ItemForm