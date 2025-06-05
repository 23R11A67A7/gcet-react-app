import React, { useContext } from "react";
import { AppContext } from "../App";
import "../App.css";

export default function Cart() {
  const { cart, setCart } = useContext(AppContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const incrementQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Remove if quantity drops to 0
    setCart(updatedCart);
  };

  return (
    <div className="form-container" style={{ width: "90%", maxWidth: "700px" }}>
      <h3 className="form-title">Cart List ❤︎</h3>

      {cart.length === 0 ? (
        <p style={{ color: "#4b007d", fontWeight: "500" }}>Your cart is empty</p>
      ) : (
        <>
          <p style={{ color: "#4b007d", fontWeight: "600", marginBottom: "20px" }}>
            Cart 🛒 ({cart.length} items / {totalItems} total)
          </p>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-name">{item.name}</div>

                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => decrementQuantity(item.id)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>

                  <span className="quantity-number">{item.quantity}</span>

                  <button
                    className="quantity-btn"
                    onClick={() => incrementQuantity(item.id)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <div>Price: ${(item.price * item.quantity).toFixed(2)}</div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}
