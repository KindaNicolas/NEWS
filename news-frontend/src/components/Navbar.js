import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi"; // ✅ Import Burger and Close Icons
import "../styles/Navbar.css"; // ✅ Import Navbar styles
import logo from "../assets/logo.png"; // ✅ Use the transparent logo

Modal.setAppElement("#root");

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });
      localStorage.setItem("token", response.data.access_token);
      setIsAuthenticated(true);
      setIsModalOpen(false);
    } catch (error) {
      alert("❌ Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        {/* Logo and Text */}
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="sub-logo">الأخبار المحلية</span>
        </div>

        {/* Burger Menu for Mobile */}
        <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>

        {/* Login/Logout Button (aligned with "الأخبار المحلية") */}
        <button className="auth-button" onClick={isAuthenticated ? handleLogout : () => setIsModalOpen(true)}>
          {isAuthenticated ? "تسجيل الخروج" : "تسجيل الدخول"}
        </button>
      </div>

      
    {/* Navigation Menu (Hidden on Mobile, Shown when Burger Menu is Clicked) */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>الرئيسية</Link></li>
        <li><Link to="/news" onClick={() => setMenuOpen(false)}>أخبار</Link></li>
        <li><Link to="/economy" onClick={() => setMenuOpen(false)}>اقتصاد</Link></li>
        <li><Link to="/sports" onClick={() => setMenuOpen(false)}>رياضة</Link></li>
        <li><Link to="/culture" onClick={() => setMenuOpen(false)}>ثقافة</Link></li>
        <li><Link to="/videos" onClick={() => setMenuOpen(false)}>فيديو وصور</Link></li>
        <li><Link to="/opinions" onClick={() => setMenuOpen(false)}>آراء</Link></li>
      </ul>

      {/* Login Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Login">
        <h2>تسجيل الدخول</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">تسجيل الدخول</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>إغلاق</button>
      </Modal>
    </div>
  );
};

export default Navbar;
