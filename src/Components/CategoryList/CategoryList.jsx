import React from 'react';
import { AppContext } from '../../Context/AppContext';
import { RiDeleteBinFill } from "react-icons/ri";
import PropTypes from 'prop-types';
import { deleteCategory } from '../../Service/CategoryService';
import toast from 'react-hot-toast';

function CategoryList() {
  const { Categories, setCategories } = React.useContext(AppContext);
  const [searchItems, setSearchItems] = React.useState("");

  const filteredCategories=Categories.filter(category => {
    return category.name.toLowerCase().includes(searchItems.toLowerCase());
  })

  const deleteByCategoryId =async (categoryId) => {
   try {
   const response= await deleteCategory(categoryId)
   if (response.status === 204) {
   const UpdatedCategories= Categories.filter((category) => category.categoryId !== categoryId);
    setCategories(UpdatedCategories);
    toast.success("Category deleted successfully");
   } else{
    toast.error("Unable to delete category");}
     
   
   } catch (error) {
    console.log("Error deleting category:", error);
    
   }
  }

  
  // Count items per category (you'll need to implement this based on your data)
  const countItemsInCategory = (categoryId) => {
    // This is a placeholder - implement based on your actual data structure
    return 0;
  };

  return (
    <div className="flex flex-col h-full bg-slate-800 gap-4 p-4 rounded-lg shadow-lg">
        <div className='searchbar mb-2 flex items-center gap-2 border border-gray-300 rounded-md p-2 bg-white focus-within:ring-2 focus-within:ring-orange-500'> 
          <input
            type="text"
            name="keyword"
            id="keyword"
        onChange={(e) => setSearchItems(e.target.value)}
            value={searchItems}
            placeholder="Search by Keywords..."
            className="w-full placeholder:text-xs text-sm p-1 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button className="text-orange-500 hover:text-orange-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

        </div>

      <h2 className="font-semibold text-lg text-white mb-2">Categories</h2>
      
      {Categories.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No categories found. Add your first category to get started.
        </div>
      ) : (
        <div className="overflow-auto max-h-[calc(100vh-200px)] pr-2">
          {filteredCategories.map((category) => (
            <div 
              key={category.categoryId} 
              className="flex justify-between items-center gap-4 mb-3 p-3 rounded-md transition-all hover:scale-[1.01] hover:shadow-md"
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-12 h-12 border rounded-md bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {category.imgUrl ? (
                 
                    
                    <img
                      src={`http://localhost:8080/${category.imgUrl}`}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "/src/assets/logo.png";
                      }}
                    />
                  ) : (
                    <img
                      src="/src/assets/logo.png"
                      alt="Default"
                      className="w-full h-full object-contain p-2"
                    />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className='font-semibold text-gray-100 truncate' title={category.name}>
                    {category.name}
                  </span>
                  <span className='text-xs text-gray-300'>
                    Items: {countItemsInCategory(category.categoryId)}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={()=>deleteByCategoryId(category.categoryId)}
                className="hover:bg-red-700 hover:text-white p-2 text-red-600 rounded-full transition-colors flex-shrink-0"
                aria-label={`Delete ${category.name}`}
              >
                <RiDeleteBinFill />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CategoryList.propTypes = {
  onCategorySelect: PropTypes.func,
  onDeleteCategory: PropTypes.func,
};

export default CategoryList;