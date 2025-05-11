import React from 'react';
import { AppContext } from '../../Context/AppContext';

function Explore() {
  const { Categories } = React.useContext(AppContext);
  console.log(Categories);
  
  return (
    <div className="flex flex-col h-screen bg-gray-800 lg:flex-row gap-4 p-4">
      {/* Left Column - 50% on large screens */}
      <div className="flex flex-col w-full  bg-slate-800 border border-gray-100 text-white p-4 rounded-lg">
        <div className="first-row h-[35%] overflow-auto">
          <h2 className=" font-semibold mb-2">Categories</h2>
          {/* Your first row content here */}
         
        </div>
        <hr className='border-t border-gray-600 my-2' />
        <div className="second-row h-1/2 overflow-auto">
          <h2 className=" font-semibold mb-2">Items</h2>
          {/* Your second row content here */}
          
        </div>
      </div>

      {/* Right Column - 50% on large screens */}
      <div className="flex flex-col w-full lg:w-1/2 bg-slate-800 border border-gray-100 text-white p-4 rounded-lg overeflow-auto ">
        <div className="Customerformcontainer h-[15%] min-h-[120px] overflow-auto mb-2">
          <h2 className=" font-semibold mb-2">Customer Form</h2>
          {/* Your form content here */}
         
        </div>
        <hr className='border-t border-gray-600 my-2' />
        <div className="cartItemcontainer h-[55%] overflow-auto mb-2">
          <h2 className=" font-semibold mb-2">Cart Items</h2>
          {/* Your cart items here */}
          
        </div>
        <hr className='border-t border-gray-600 my-2' />
        <div className="cartSummarycontainer flex-1 overflow-auto">
          <h2 className=" font-semibold mb-2">Cart Summary</h2>
          {/* Your summary content here */}
          
        </div>
      </div>
    </div>
  );
}

export default Explore;