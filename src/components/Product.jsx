import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Product() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [showCartButton, setShowCartButton] = useState(false);
  const navigate = useNavigate();

  // Fetch product list from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://gcet-node-app-dun.vercel.app/products/");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add to cart logic
  const addToCart = (product) => {
    // Ensure ID comparison is consistent
    const existingItem = cart.find((item) => Number(item.id) === Number(product.id));
    
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        Number(item.id) === Number(product.id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setShowCartButton(true);
  };

  return (
    <div className="form-container" style={{ width: "90%", maxWidth: "1000px" }}>
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

      {showCartButton && (
        <button className="go-to-cart-btn" onClick={() => navigate("/cart")}>
          Go to Cart 🛒
        </button>
      )}
    </div>
  );
}
