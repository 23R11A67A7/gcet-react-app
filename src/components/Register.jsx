import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !email || !password) {
      alert("All fields are required.");
      return;
    }

    const alreadyExists = users.find(u => u.email === email);
    if (alreadyExists) {
      alert("A user with this email already exists.");
      return;
    }

    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    alert("🎉 Registration successful!");
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h3 className="form-title">✍️ Register</h3>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
