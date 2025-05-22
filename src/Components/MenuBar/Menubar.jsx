import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

function Menubar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuthData } = useContext(AppContext);
  
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

  const isActive = (path) => {
    return location.pathname === path;
  };
  const isAdmin=auth.role==='ROLE_ADMIN';

  return (
    <header className="bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img src="/src/assets/logo.png" alt="logo" className="h-8" />
          </Link>
          
          <nav className="hidden lg:flex space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-black' : 'hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/explore" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/explore') ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-black' : 'hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black'}`}
            >
              Explore
            </Link>
           {isAdmin &&
           <>
            <Link 
              to="/manageitems" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/manageitems') ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-black' : 'hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black'}`}
            >
              Manage Items
            </Link>
            <Link 
              to="/categories" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/categories') ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-black' : 'hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black'}`}
            >
              Manage Categories
            </Link>
           
              <Link 
                to="/manageusers" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/manageusers') ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-black' : 'hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black'}`}
              >
                Manage Users
              </Link>
          
           </>

           }
            <Link 
              to="/orderhistory" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/orderhistory') ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-black' : 'hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black'}`}
            >
              Order History
            </Link>
          </nav>
        </div>

        {/* User Controls */}
        <div className="flex items-center space-x-4">
          {auth ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <img 
                  className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600" 
                  src="/src/assets/profile.jpg" 
                  alt="User profile"
                />
                <svg 
                  className={`w-4 h-4 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Your Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Settings
                    </Link>
                    <button 
                      onClick={logOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={toggleLoginDropdown}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-sm font-medium"
              >
                Login
                <svg 
                  className={`w-4 h-4 ml-1 inline transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLoginDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link 
                      to="/login/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Admin Login
                    </Link>
                    <Link 
                      to="/login/user" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      User Login
                    </Link>
                    <Link 
                      to="/login/guest" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Guest Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            type="button" 
            className="lg:hidden p-2 rounded-md text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-700 dark:bg-gray-200 px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-gray-600 text-white dark:bg-gray-300 dark:text-black' : 'text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/explore" 
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/explore') ? 'bg-gray-600 text-white dark:bg-gray-300 dark:text-black' : 'text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black'}`}
          >
            Explore
          </Link>
          <Link 
            to="/manageitems" 
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/manageitems') ? 'bg-gray-600 text-white dark:bg-gray-300 dark:text-black' : 'text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black'}`}
          >
            Manage Items
          </Link>
          <Link 
            to="/categories" 
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/categories') ? 'bg-gray-600 text-white dark:bg-gray-300 dark:text-black' : 'text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black'}`}
          >
            Manage Categories
          </Link>
          {auth?.role === 'admin' && (
            <Link 
              to="/manageusers" 
              onClick={toggleMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/manageusers') ? 'bg-gray-600 text-white dark:bg-gray-300 dark:text-black' : 'text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black'}`}
            >
              Manage Users
            </Link>
          )}
          <Link 
            to="/orderhistory" 
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/orderhistory') ? 'bg-gray-600 text-white dark:bg-gray-300 dark:text-black' : 'text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black'}`}
          >
            Order History
          </Link>

          {!auth && (
            <div className="pt-2 border-t border-gray-600 dark:border-gray-400">
              <Link 
                to="/login/admin" 
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black"
              >
                Admin Login
              </Link>
              <Link 
                to="/login/user" 
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black"
              >
                User Login
              </Link>
              <Link 
                to="/login/guest" 
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black"
              >
                Guest Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Menubar;