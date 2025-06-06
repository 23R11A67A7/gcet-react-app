import React, { useContext } from "react";
import { AppContext } from "../App";

export default function OrderSummary() {
  const { orders } = useContext(AppContext);

  return (
    <div className="form-container" style={{ maxWidth: "700px" }}>
      <h3 className="form-title">Your Orders 🧾</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li key={order.id} className="cart-item">
              <div>Order ID: #{order.id}</div>
              <div>Date: {order.date}</div>
              <div>Status: {order.status}</div>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
