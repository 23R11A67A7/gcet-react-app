import React, { useContext } from "react";
import { AppContext } from "../App";
import '../App.css';

export default function Cart() {
  const { cart } = useContext(AppContext);

  if (cart.length === 0) {
    return (
      <div className="form-container">
        <h3 className="form-title">Cart List ❤︎</h3>
        <p>Your Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Cart List ❤︎</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> — Qty: {item.quantity} — Price: ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
