import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AppContext } from '../../Context/AppContext';
import { addCategory } from '../../Service/CategoryService';

function CategoryForm() {
  const { categories, setCategories } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#000fea"
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Select image for category");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);
    try {
      const response = await addCategory(formData);
      if (response.status === 201) {
        setCategories([...categories, response.data]);
        toast.success("Category added successfully");
        setData({ name: "", description: "", bgColor: "#000fea" });
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto h-full p-2">
      <div className="bg-white text-black rounded-lg shadow-md p-4">
        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/src/assets/upload.png"
                    alt="Default"
                    className="w-full h-full object-contain p-2"
                  />
                )}
              </div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="px-2 py-1 text-xs font-semibold border border-orange-600 text-black rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Upload Image
              </label>
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-2">
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter category name"
              required
              className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-2">
            <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={data.description}
              onChange={onChangeHandler}
              placeholder="Enter category description"
              className="w-full px-3 py-1 placeholder:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Background Color Picker */}
          <div className="flex mb-3 items-center">
            <label htmlFor="bgColor" className="text-xs font-medium text-gray-700 mr-2">
              Background Color:
            </label>
            <input
              type="color"
              id="bgColor"
              name="bgColor"
              value={data.bgColor}
              onChange={onChangeHandler}
              className="w-20 h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
