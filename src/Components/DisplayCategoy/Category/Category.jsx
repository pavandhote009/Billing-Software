import React from 'react';
import { motion } from 'framer-motion';

function Category({ categoryName, imgUrl, numberOfItem, bgColor, onCklick, isSelected }) {
  console.log(isSelected);
  
  return (
    <motion.div
      onClick={onCklick}
      style={{ backgroundColor: bgColor, cursor: "pointer" }}
      className={`flex justify-between h-20 w-44 items-center border border-gray-200 gap-4 p-2 rounded-xl hover:shadow-lg transition-all relative overflow-hidden`}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background highlight when selected */}
      {isSelected && (
        <motion.div 
          className="absolute inset-0 bg-white bg-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Icon with subtle animation */}
      <motion.div 
        className='flex-shrink-0 border border-gray-200 rounded-md'
        whileHover={{ rotate: 5 }}
      >
        <img 
          src={imgUrl} 
          alt={categoryName} 
          className='w-14 h-14 object-contain'
        />
      </motion.div>
      
      <div className='flex flex-col flex-grow'>
        <motion.h6 
          className='font-bold text-gray-800 text-md'
          whileHover={{ x: 2 }}
        >
          {categoryName}
        </motion.h6>
        <motion.p 
          className='text-sm text-gray-600'
          whileHover={{ x: 2 }}
        >
          {numberOfItem} Items
        </motion.p>
      </div>
      
      {/* Animated checkmark when selected */}
      {isSelected && (
        <motion.div
          className="ml-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <svg 
            className="w-6 h-6 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </motion.div>
      )}

    </motion.div>
  );
}

export default Category;