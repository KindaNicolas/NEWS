import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

// ✅ Fix the warning by setting the app element
Modal.setAppElement("#root");

const LoginModal = ({ isOpen, closeModal, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token); // ✅ Store token
      setIsAuthenticated(true);
      closeModal();
    } catch (error) {
      alert("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Login">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">تسجيل الدخول</button>
      </form>
      <button onClick={closeModal}>إغلاق</button>
    </Modal>
  );
};

export default LoginModal;
