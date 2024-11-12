// src/components/AddProduct.js
import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: ""
  });
  
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      await axios.post("http://localhost:5000/products", product);
      setMessage("Product added successfully!");
      setProduct({ name: "", price: "", description: "", category: "" });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add product.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
      
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddProduct;
