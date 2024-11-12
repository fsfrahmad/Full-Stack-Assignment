// src/components/DeleteProduct.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DeleteProduct.css";

function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch products from the backend on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setMessage("Product deleted successfully!");
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.response || error.message);
      setMessage("Failed to delete product.");
    }
  };
  
  return (
    <div className="delete-product-container">
      <h2>Delete Products</h2>
      {message && <p className="message">{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleDelete(product._id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteProduct;
