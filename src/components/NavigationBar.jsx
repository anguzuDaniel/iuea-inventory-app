import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const NavigationBar = () => {
    return (
        <header className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-start justify-between">
          <h1 className="text-white text-2xl font-semibold">Inventory App</h1>
  
          <nav className="space-x-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>
    );
}

export default NavigationBar;