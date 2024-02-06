// AppRouter.js
import React, { useEffect, useContext, useState, createContext } from 'react';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InventoryPage from './pages/InventoryPage';
import DashBoardPage from './pages/DashBoardPage';
import { FirebaseProvider, useFirebase } from './Context';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { EditProfilePage } from './pages/EditProfilePage';

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
              <Route path="/reset-password" element={<ForgotPasswordPage/>} />
              <Route path="/dashboard" element={<PrivateRoute element={<DashBoardPage />} />} />
              <Route path="/inventory" element={<PrivateRoute element={<InventoryPage />} />} />
              <Route path="/edit-profile" element={<PrivateRoute element={<EditProfilePage />} />} />

          </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;