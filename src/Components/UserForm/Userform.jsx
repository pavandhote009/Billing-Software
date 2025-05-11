import React, { useState } from 'react'

function Userform() {
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
    <div className="max-w-xs mx-auto h-full p-2">
      <div className="bg-white text-black rounded-lg shadow-md p-4">
        
        <form onSubmit={handleSubmit}>
        

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
              placeholder="John Doe"
              className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-2">
            <label 
              htmlFor="name" 
              className="block text-xs font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
           
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-2">
            <label 
              htmlFor="name" 
              className="block text-xs font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
           
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        
          

          <button
            type="submit"
            className="w-full mt-2 bg-orange-600 text-white py-1 px-4 rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Save 
          </button>
        </form>
      </div>
    </div>
  );
}

export default Userform