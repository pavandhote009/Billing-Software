import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Menubar from './Components/MenuBar/Menubar'; // adjust path accordingly
import Dashboard from './Pages/Dashboard/Dashboard';
import Explore from './Pages/Explore/Explore';
import ManageItems from './Pages/ManageItems/Manageitems';
import ManageCategories from './Pages/ManageCategories/ManageCategories';
import ManageUsers from './Pages/ManageUsers/ManageUsers';
import './App.css'; // adjust path accordingly
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Explore/Login/Login';


function App() {
  const location =useLocation();

  return (
   <div>

      {location.pathname !== '/login' && <Menubar/>}
      <Toaster/>

      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/manageitems" element={<ManageItems />} />
        <Route path="/categories" element={<ManageCategories />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
  
   </div>
  );
}
export default App;