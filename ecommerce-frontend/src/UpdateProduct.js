// src/components/UpdateProduct.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpdateProduct.css";

function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Stores the product to be updated
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Failed to fetch products.");
    }
  };

  // Populate the form with the selected product's data
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setMessage(""); // Clear any previous messages
  };

  // Update product information in the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${selectedProduct._id}`, selectedProduct);
      setMessage("Product updated successfully!");
      fetchProducts(); // Refresh product list
      setSelectedProduct(null); // Clear the form
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Failed to update product.");
    }
  };

  // Handle changes in form input fields
  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="update-product-list-container">
      <h2>Update Products</h2>
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
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEdit(product)} className="edit-button">
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to update the selected product */}
      {selectedProduct && (
        <form onSubmit={handleSubmit} className="update-form">
          <h3>Update Product: {selectedProduct.name}</h3>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={selectedProduct.name}
            onChange={handleChange}
            required
          />

          <label>Price</label>
          <input
            type="number"
            name="price"
            value={selectedProduct.price}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={selectedProduct.description}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={selectedProduct.category}
            onChange={handleChange}
            required
          />

          <button type="submit" className="save-button">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default UpdateProduct;
