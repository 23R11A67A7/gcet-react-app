import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import '../App.css';

export default function Header() {
  const { user, cart } = useContext(AppContext);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <h1>My Online Store</h1>
      <nav>
        <Link to="/">Home🏠︎</Link>
        <Link to="/cart">
          Cart🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        {user?.token ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
