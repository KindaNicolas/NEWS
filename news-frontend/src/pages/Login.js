import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ Prevent form reload

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token); // ✅ Store token in localStorage
        console.log("✅ Token stored:", response.data.token);
        onLogin(response.data.token); // ✅ Update parent state
        window.location.reload(); // ✅ Refresh the page to reflect login state
      } else {
        console.error("❌ No token received");
      }
    } catch (error) {
      console.error("❌ Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">تسجيل الدخول</button>
    </form>
  );
};

export default Login;
