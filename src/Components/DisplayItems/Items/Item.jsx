import React, { useContext } from 'react';
import { FiPlus, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { AppContext } from '../../../Context/AppContext';

function Item({ itemName, itemPrice, itemId, itemImage, itemDesc }) {
    const {addToCart}=useContext(AppContext)

    const handleAddtoCart = () => {
        addToCart({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            itemId:itemId
        })
    }
  return (
    <motion.div 
      className="flex h-20 w-60 bg-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
      whileHover={{ y: -5 }}
    >
      {/* Image on the left */}
      <div className=" w-16 h-16 rounded-md border m-2 bg-white border-gray-200 overflow-hidden">
        <img 
          src={itemImage} 
          alt={itemName} 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Middle section for name and price */}
      <div className="w-2/4 p-3 flex flex-col justify-center">
        <h3 className="text-sm mb-1 font-semibold text-gray-100">{itemName}</h3>
        <span className="text-sm w-16 px-2 font-bold rounded-lg bg-orange-600">₹{itemPrice}</span>
      </div>

      {/* Right section for other content and actions */}
      <div className="w-1/4 p-3 flex flex-col justify-between items-end">
        
        <div className="flex flex-col gap-2">
          <motion.button
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus className="text-gray-700" size={16} />
          </motion.button>
          <motion.button 
            onClick={handleAddtoCart}
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShoppingCart size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Item;