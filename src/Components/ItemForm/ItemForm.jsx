import React, { useState } from 'react'

function ItemForm() {
  const [categoryName, setCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ categoryName, image: selectedImage });
  };

  return (
    <div className="max-w-xs mx-auto h-full p-2 ">
      <div className="bg-white text-black rounded-lg shadow-md p-4">
        
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                {selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />    
                ) : (
                  <img 
                    src="/src/assets/logo.png" 
                    alt="Default" 
                    className="w-full h-full object-contain p-2"
                  />
                )}
              </div>
              <input
                type="file"
                id="image-upload"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="px-2 py-1 text-xs font-semibold border border-orange-600 text-black   rounded-md cursor-pointer hover:bg-orange-700 transition-colors"
              >
                Upload Image
              </label>
            </div>
          </div>

          <div className="mb-2">
            <label 
              htmlFor="name" 
              className="block text-xs font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Item name"
              className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="category" className='block text-xs font-medium text-gray-700 m-2'>Category</label>
            <select name="category" id="category">
                <option value="category1" selected >--Select Category--</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
                <option value="category4">Category 4</option>
            </select>
            <div>
                <label htmlFor="price" className='block text-xs font-medium text-gray-700 m-2'>Price</label>
                <input
                type="number"
                id="price"
                name="price"
                placeholder="&#8377; 200.00"
                className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
          </div>
          <div className="mb-2">
            <label 
              htmlFor="name" 
              className="block text-xs font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
            rows="5"
              id="description"
              name="description"
              placeholder="Enter Item description"
              className="w-full px-3 py-1 placeholder:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
         
          </div>
        

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-1 px-4 rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Save 
          </button>
        </form>
      </div>
    </div>
  );
}

export default ItemForm