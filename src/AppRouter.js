// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InventoryPage from './pages/InventoryPage';
import DashBoardPage from './pages/DashBoardPage';

function AppRouter() {
  return (
    <Router>
      <div>
          <Routes>
              <Route path="/" exact element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/dashboard" element={<DashBoardPage/>} />
              <Route path="/inventory" element={<InventoryPage/>} />
          </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;