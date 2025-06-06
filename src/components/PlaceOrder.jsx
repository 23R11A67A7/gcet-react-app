import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { cart, setCart, setOrders } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length > 0) {
      const orderId = Date.now();
      const newOrder = {
        id: orderId,
        items: [...cart],
        date: new Date().toLocaleString(),
        status: "Pending",
      };
      setOrders((prev) => [...prev, newOrder]);
      setCart([]);
    }
  }, [cart, setCart, setOrders]);

  return (
    <div className="form-container">
      <h3 className="form-title">Order Placed Successfully 🥳</h3>
      <p>Your order has been placed. You can track it in the order summary.</p>
      <button className="go-to-cart-btn" onClick={() => navigate("/order-summary")}>
        View Order Summary
      </button>
    </div>
  );
}
