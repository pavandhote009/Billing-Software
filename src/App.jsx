import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Menubar from './Components/MenuBar/Menubar'; // adjust path accordingly
import Dashboard from './Pages/Dashboard/Dashboard';
import Explore from './Pages/Explore/Explore';
import ManageItems from './Pages/ManageItems/Manageitems';
import ManageCategories from './Pages/ManageCategories/ManageCategories';
import ManageUsers from './Pages/ManageUsers/ManageUsers';
import './App.css'; // adjust path accordingly
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Explore/Login/Login';
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import { AppContext } from './Context/AppContext';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  const location = useLocation();
  const { auth } = useContext(AppContext);

  const LoginRoute = ({ element }) => {
    if (auth.token) {
      return <Navigate to='/dashboard' replace />;
    }
    return element;
  }

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to='/login' replace />;
    }
    if (!allowedRoles.includes(auth.role)) {
      return <Navigate to='/dashboard' replace />;
    }
    return element;
  }

  return (
    <div>
      {location.pathname !== '/login' && <Menubar />}
      <Toaster />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />

        <Route 
          path="/manageitems" 
          element={<ProtectedRoute element={<ManageItems />} allowedRoles={['ROLE_ADMIN']} />} 
        />
        <Route 
          path="/categories" 
          element={<ProtectedRoute element={<ManageCategories />} allowedRoles={['ROLE_ADMIN']} />} 
        />
        <Route 
          path="/manageusers" 
          element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['ROLE_ADMIN']} />} 
        />

        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;