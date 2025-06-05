import React, { useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Logout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setUser({});
      navigate("/login");
    }, 1500); // 1.5-second delay to show animation
  }, [setUser, navigate]);

  return (
    <div className="form-container">
      <h3 className="form-title">Logging out...</h3>
      <div className="spinner"></div>
    </div>
  );
}
