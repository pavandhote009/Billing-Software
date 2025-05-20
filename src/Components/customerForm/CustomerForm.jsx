import React from 'react';

function CustomerForm({ customerName, setCustomerName, mobileNumber, setMobileNumber }) {
  return (
    <div className="space-y-4 max-w-md mx-auto px-4 mt-2">
      <div className="space-y-2">
        <div className="flex flex-row gap-2 justify-center items-center">
          <label 
            htmlFor="customerName" 
            className="block text-xs font-medium text-white mb-1"
          >
            Customer Name:
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="px-3 py-1 border border-gray-300 placeholder:text-sm text-black bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter customer name"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex flex-row gap-2 items-center justify-center ">
          <label 
            htmlFor="mobileNumber" 
            className="block text-xs  font-medium text-white mb-1"
          >
            Mobile Number:
          </label>
          <input
            type="tel"  // Changed to tel for better mobile input support
            id="mobileNumber"
            name="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            className="h-9 px-3 py-1 border border-gray-300 placeholder:text-sm text-black bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter mobile number"
            pattern="[0-9]{10}"  // Basic pattern for 10-digit numbers
          />
         
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;