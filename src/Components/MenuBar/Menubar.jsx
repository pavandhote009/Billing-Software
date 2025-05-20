import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

function Menubar() {
  const navigate = useNavigate();
  const {setAuthData}=useContext(AppContext);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLoginDropdown = () => {
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthData(null, null);
    navigate('/login');

   
  };

  return (
    <header className="p-4 bg-gray-800  dark:bg-gray-100 text-gray-100 dark:text-gray-800">
      <div className="container flex justify-between h-10  mx-auto">
            <img src="/src/assets/logo.png" alt="logo" />
        <ul className="items-stretch hidden space-x-3 lg:flex">
  <li className="flex">
    <Link to="/" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Dashboard
    </Link>
  </li>
  <li className="flex">
    <Link to="/explore" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Explore
    </Link>
  </li>
  <li className="flex">
    <Link to="/manageitems" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Manage Items
    </Link>
  </li>
  <li className="flex">
    <Link to="/categories" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Manage Categories
    </Link>
  </li>
  <li className="flex">
    <Link to="/manageusers" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Manage Users
    </Link>
  </li>
</ul>

        
        <div className="flex items-center md:space-x-4">
        <div className="flex items-center md:space-x-4">
  {/* Profile Image Dropdown */}
  <div className="relative">
    <button 
      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
      className="flex items-center focus:outline-none"
    >
      <img 
        className="w-8 h-8 rounded-full" 
        src="src/assets/profile.jpg" 
        alt="User profile"
      />
      <svg 
        className={`w-4 h-4 ml-1 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    {isProfileDropdownOpen && (
      <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Your Profile</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
          <a href="#" onClick={logOut} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Log out</a>
        </div>
      </div>
    )}
  </div>

</div>
            
            {isLoginDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Admin Login</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">User Login</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Guest Login</a>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={toggleMobileMenu}
          title="Open menu" 
          type="button" 
          className="p-4 lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-100 dark:text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      
     
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
  
    <Link to="/" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Dashboard
    </Link>

  
    <Link to="/explore" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Explore
    </Link>

  
    <Link to="/manageitems" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Manage Items
    </Link>

  
    <Link to="/categories" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Manage Categories
    </Link>

  
    <Link to="/manageusers" className="flex items-center px-2 hover:text-orange-500 hover:border-blue-700 hover:border">
      Manage Users
    </Link>




          </div>
          <div className="pt-4 pb-3 border-t border-gray-700 dark:border-gray-200">
            <div className="mt-3 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 dark:text-gray-800">Admin Login</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 dark:text-gray-800">User Login</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 dark:text-gray-800">Guest Login</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Menubar;