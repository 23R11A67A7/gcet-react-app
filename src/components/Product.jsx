import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "../App.css";

export default function Product() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="form-container">
      {user && <h2 className="form-title">Welcome, {user.name}!</h2>}
      <p style={{ color: "#690530", fontWeight: "500" }}>🛍 Product List</p>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imgUrl}
              alt={product.name}
              style={{ borderRadius: "10px", width: "100%", marginBottom: "10px" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/250x150?text=No+Image";
              }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">₹{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
