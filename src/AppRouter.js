// AppRouter.js
import React, { useEffect, useContext, useState, createContext } from 'react';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InventoryPage from './pages/InventoryPage';
import DashBoardPage from './pages/DashBoardPage';
import { FirebaseProvider, useFirebase } from './Context';


const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const { user } = useFirebase();

  if(!user) {
    navigate('/');
    return null;
  }

  return element;
};

function AppRouter() {
  return (
    <Router>
      <div>
          <Routes>
              <Route path="/" exact element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/dashboard" element={<PrivateRoute element={<DashBoardPage />} />} />
              <Route path="/inventory" element={<PrivateRoute element={<InventoryPage />} />} />
          </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;