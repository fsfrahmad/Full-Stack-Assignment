// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Menu from './Menu';
import UpdateProduct from './UpdateProduct';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? (
          <div style={{ display: 'flex' }}>
            <Menu />
            <div className="content-container">
              <Routes>
                <Route path="/ProductList" element={<ProductList />} />
                <Route path="/AddProduct" element={<AddProduct />} />
                <Route path="/DeleteProduct" element={<DeleteProduct />} />
                <Route path="/UpdateProduct" element={<UpdateProduct />} />
                <Route path="*" element={<Navigate to="/ProductList" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login onSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<SignUp onSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
