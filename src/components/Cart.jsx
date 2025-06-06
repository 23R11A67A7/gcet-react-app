import React, { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increment = (id) => {
    setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrement = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = () => {
    navigate("/place-order");
  };

  return (
    <div className="form-container" style={{ width: "90%", maxWidth: "700px" }}>
      <h3 className="form-title">Cart List ❤︎</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <p>Cart 🛒 ({cart.length} items / {totalItems} total)</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-name">{item.name}</div>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={() => decrement(item.id)}>-</button>
                  <span className="quantity-number">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => increment(item.id)}>+</button>
                </div>
                <div>Price: ${(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <div className="cart-total">Total Price: ${totalPrice.toFixed(2)}</div>

          <button className="go-to-cart-btn" onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}
