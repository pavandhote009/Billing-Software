import React from 'react';
import { AppContext } from '../../Context/AppContext';
import DisplayCategory from '../../Components/DisplayCategoy/DisplayCategory';
import DisplayItems from '../../Components/DisplayItems/DisplayItems';
import CustomerForm from '../../Components/customerForm/CustomerForm';
import CartItems from '../../Components/CartItems/CartItems';
import CartSummary from '../../Components/CartSummary/cartSummary';

function Explore() {
  const [customerName, setCustomerName] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState(" ");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const { Categories } = React.useContext(AppContext);
  console.log(Categories);
  
  return (
    <div className="flex flex-col h-screen bg-gray-800 lg:flex-row gap-4 p-4">
      {/* Left Column - 50% on large screens */}
      <div className="flex flex-col w-full  bg-slate-800 border border-gray-100 text-white p-4 rounded-lg">
        <div className="first-row h-[35%] ">
          <DisplayCategory 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={Categories}/>
         
        </div>
        <hr className='border-t border-gray-600 my-2' />
        <div className="second-row h-1/2 overflow-auto">
          {/* Your second row content here */}
          <DisplayItems selectedcategory={selectedCategory}/>
          
        </div>
      </div>

      {/* Right Column - 50% on large screens */}
      <div className="flex flex-col w-full lg:w-1/2 bg-slate-800 border border-gray-100 text-white p-2 rounded-lg overeflow-auto ">
        <div className="Customerformcontainer h-[15%] min-h-[120px] overflow-auto mb-2">
          {/* Your form content here */}
          <CustomerForm
          customerName={customerName}
          mobileNumber={mobileNumber}
          setCustomerName={setCustomerName}
          setMobileNumber={setMobileNumber}
          />
         
        </div>
        <hr className='border-t border-gray-600 my-2' />
        <div className="cartItemcontainer h-[50%] overflow-auto ">
          <h2 className=" font-semibold mb-2">Cart Items</h2>
          {/* Your cart items here */}
          <CartItems/>
          
        </div>
        <hr className='border-t border-gray-600 ' />
        <div className="cartSummarycontainer flex-1 overflow-auto">
          {/* Your summary content here */}
          <CartSummary
           customerName={customerName}
          mobileNumber={mobileNumber}
          setCustomerName={setCustomerName}
          setMobileNumber={setMobileNumber}/>
          
        </div>
      </div>
    </div>
  );
}

export default Explore;