import React from 'react'

function Dashboard() {
  return (
     <div className="flex  flex-col h-screen bg-slate-800 lg:flex-row gap-4 p-4">
      {/* Left Column - 70% on large screens */}
      <div className="w-full lg:w-[70%] bg-slate-800  border-1 border-gray-200 text-white p-4 rounded">
        Dashboard
      </div>

      {/* Right Column - 30% on large screens */}
      <div className="w-full lg:w-[30%] bg-slate-800  border-1 border-gray-200 text-white p-4 rounded">
        list 
      </div>
    </div>
  )
}

export default Dashboard