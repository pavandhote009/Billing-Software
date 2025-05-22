import React from 'react';
import CategoryForm from '../../Components/CategoryForm/CategoryForm';
import CategoryList from '../../Components/CategoryList/CategoryList';

function ManageCategories() {
  return (
    <div className="flex  flex-col min-h-full lg:h-screen bg-slate-800 lg:flex-row gap-4 p-4">
      {/* Left Column - 70% on large screens */}
      <div className="w-full lg:w-[70%] bg-slate-800  border-1 border-gray-200 text-white p-4 rounded">
      <CategoryForm/>
      </div>

      {/* Right Column - 30% on large screens */}
      <div className="w-full lg:w-[30%] bg-slate-800  border-1 border-gray-200 text-white p-4 rounded">
      <CategoryList/>
      </div>
    </div>
  );
}

export default ManageCategories;
