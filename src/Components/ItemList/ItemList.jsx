import React from 'react';
import { AppContext } from '../../Context/AppContext';
import { deleteItem } from '../../Service/ItemService';
import toast from 'react-hot-toast';

function ItemList() {
  const { itemsData, setItemsData } = React.useContext(AppContext);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredItems = itemsData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeItem = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status === 204) {
        const updatedItems = itemsData.filter((item) => item.itemId !== itemId);
        setItemsData(updatedItems);
        toast.success("Item deleted successfully");
      } else {
        toast.error("Unable to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Unable to delete item");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-800 gap-4 p-4 rounded-lg shadow-lg">
      {/* Search Bar */}
      <div className='searchbar mb-2 flex items-center gap-2 border border-gray-300 rounded-md p-2 bg-white focus-within:ring-2 focus-within:ring-orange-500'> 
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search items..."
          className="w-full placeholder:text-xs text-sm p-1 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
        />
        <button className="text-orange-500 hover:text-orange-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Items List */}
      <h2 className="font-semibold text-lg text-white mb-2">Items</h2>
      
      {itemsData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No items found. Add your first item to get started.
        </div>
      ) : (
        <div className="overflow-auto max-h-[calc(100vh-200px)] pr-2 space-y-3">
          {filteredItems.map((item) => (
            <div key={item.itemId} className='w-full bg-black border border-gray-600 text-white p-3 rounded-lg hover:bg-slate-600 transition-colors'>
              <div className='flex justify-between items-center gap-4'>
                <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    src={`http://localhost:8080/api/v1.0/${item.imgUrl || '/src/assets/logo.png'}`} 
                    alt={item.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <h6 className='font-medium text-white mb-1 truncate'>{item.name}</h6>
                  <p className='text-xs text-gray-300'>Category: {item.categoryName}</p>
                  <p className='text-sm text-orange-400'>Price: ₹{item.price}</p>
                </div>
                <button 
                  onClick={() => removeItem(item.itemId)}
                  className='text-red-500 hover:text-red-700 transition-colors p-2'
                  aria-label={`Delete ${item.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;