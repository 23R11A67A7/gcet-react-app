import React, { useContext } from "react";
import { AppContext } from "../App";
import '../App.css';

export default function Cart() {
  const { cart } = useContext(AppContext);

  if (cart.length === 0) {
    return (
      <div className="form-container">
        <h3 className="form-title">Cart List ❤︎ </h3>
        <p style={{ color: "#4b007d" }}>Your Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Cart List ❤︎</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map(item => (
          <li key={item.id} style={{ marginBottom: "12px" }}>
            <strong>{item.name}</strong> — Qty: {item.quantity} — Price: ${item.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
