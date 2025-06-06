import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Logout from "./components/Logout";
import PlaceOrder from "./components/PlaceOrder.jsx";
import OrderSummary from './components/OrderSummary.jsx';

import "./App.css";

export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser, cart, setCart, orders, setOrders }}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={user ? <Product /> : <Navigate to="/login" />} />
            <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
