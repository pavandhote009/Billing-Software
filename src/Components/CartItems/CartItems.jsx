import React from 'react';
import { AppContext } from '../../Context/AppContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

function CartItems() {
  const { cartItems, removeFromCart, updateQuantity } = React.useContext(AppContext);
  
  return (
    <div className='w-full h-20 flex flex-col gap-4 p-4'>
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-40'>
          <p className='text-xl font-semibold text-gray-500'>Your Cart is Empty</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {cartItems.map((item, index) => (
            <div key={index} className='bg-black rounded-lg shadow-sm p-2 h-20 flex flex-col justify-between border border-gray-100'>
              {/* Top row - Name and Price */}
              <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold truncate max-w-[60%]'>{item.name}</p>
                <p className='text-lg font-bold bg-orange-600 px-2 rounded-lg text-gray-100'>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>

              {/* Middle row - Unit Price */}
              <div className='text-sm text-gray-500'>
                ₹{item.price.toFixed(2)} per item
              </div>

              {/* Bottom row - Quantity controls and Remove */}
              <div className='flex items-center justify-end -py-2 '>
                <div className='flex items-center space-x-3 mr-2 '>
                  <button
                    onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className='p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50'
                  >
                    <FiMinus className='text-gray-700' size={16} />
                  </button>
                  <span className='font-medium w-6 text-center'>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                    className='p-1 rounded-full bg-gray-100 hover:bg-gray-200'
                  >
                    <FiPlus className='text-gray-700' size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.itemId)}
                  className='flex  items-center text-red-500 hover:text-red-700'
                >
                  <FiTrash2 className='mr-1' size={16} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartItems;