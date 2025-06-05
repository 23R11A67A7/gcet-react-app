import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // to generate unique IDs
import "../App.css";

export default function Product() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products");

      // Ensure each product has a unique ID
      const dataWithIds = res.data.map((product, index) => ({
        ...product,
        id: product.id ?? uuidv4(), // use existing ID or generate a new one
      }));

      setProducts(dataWithIds);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="form-container" style={{ width: '90%', maxWidth: '1000px' }}>
      {user && <h2 className="form-title">Welcome, {user.name}!</h2>}
      <p style={{ color: "#4b007d", fontWeight: "600" }}>Product List</p>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.image && (
              <img src={product.image} alt={product.name} />
            )}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price.toFixed(2)}</div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
