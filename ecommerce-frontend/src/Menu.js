import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Import your CSS file to style the menu

function Menu() {
  return (
    <div className="menu">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/ProductList">
            <span role="img" aria-label="drive">👤</span> View Products
          </Link>
        </li>
        <li>
          <Link to="/AddProduct">
            <span role="img" aria-label="computers">💻</span> Add Products
          </Link>
        </li>
        <li>
          <Link to="/DeleteProduct">
            <span role="img" aria-label="shared">📂</span> Delete Product
          </Link>
        </li>
        <li>
          <Link to="/UpdateProduct">
            <span role="img" aria-label="starred">⭐</span> Update Product
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
