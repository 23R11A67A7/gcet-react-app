import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "../App.css";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className="header">
      <h1 className="header-title">My Online Store</h1>
      <nav className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/cart">🛒 Cart</Link>
        {user?.token ? (
          <Link to="/logout">🚪 Logout</Link>
        ) : (
          <Link to="/login">🔐 Login</Link>
        )}
      </nav>
    </header>
  );
}
