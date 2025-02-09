import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; 
import news1 from "../assets/news7.png";
import news2 from "../assets/news2.png";
import news3 from "../assets/news3.png";
import news4 from "../assets/news6.png";
import news5 from "../assets/news5.png";
import logo from "../assets/logo.png"; 
import CategoriesGrid from "./CategoriesGrid"; 
import MostRead from "./MostRead"; 
import Footer from "./Footer"; 

const images = [news1, news2, news3, news4, news5];

const NewsPortal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("ar"); //Default to Arabic
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      // Auto-slide images only on web
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      setIsLoggedIn(true);
      setShowLoginPopup(false);
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ No token found for logout.");
      setIsLoggedIn(false);
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("❌ Logout failed:", error.response ? error.response.data : error);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  };

  //Language Switch Function
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "ar" ? "en" : "ar"));

    //Change text direction dynamically
    document.body.style.direction = language === "ar" ? "ltr" : "rtl";
  };

  return (
    <div className="outer-container">
      <div className="container">
        {/*  Language Switcher Button */}
        <button className="language-switcher" onClick={toggleLanguage}>
          {language === "ar" ? " English" : " العربية"}
        </button>

        {/*  Logo and Login */}
        <div className="header-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <p className="logo-text">{language === "ar" ? "الأخبار المحلية" : "Local News"}</p>
          </div>
          {isLoggedIn ? (
            <button className="login-button" onClick={handleLogout}>
              {language === "ar" ? "تسجيل الخروج" : "Logout"}
            </button>
          ) : (
            <button className="login-button" onClick={() => setShowLoginPopup(true)}>
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </button>
          )}
        </div>

        {/*  Navigation over carousel */}
        <div className="carousel-container">
          <div className="carousel">
            <img src={images[currentIndex]} alt="Main News" className="carousel-image" />
            
            {isMobile && (
              <>
                <button className="carousel-button left" onClick={handlePrev}>
                  ❮
                </button>
                <button className="carousel-button right" onClick={handleNext}>
                  ❯
                </button>
              </>
            )}
            
            <nav className="navbar">
              {[
                { ar: "الرئيسية", en: "Home" },
                { ar: "أخبار", en: "News" },
                { ar: "اقتصاد", en: "Economy" },
                { ar: "رياضة", en: "Sports" },
                { ar: "ثقافة", en: "Culture" },
                { ar: "فيديو وصور", en: "Videos & Photos" },
                { ar: "آراء", en: "Opinions" },
              ].map((category, index) => (
                <React.Fragment key={category.ar}>
                  <a href="#" className="nav-item">
                    {language === "ar" ? category.ar : category.en}
                  </a>
                  {index < 6 && <span className="nav-separator">|</span>}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Categories Grid */}
         <CategoriesGrid token={localStorage.getItem("token")} language={language} />
        <MostRead language={language} />
        <Footer language={language} />

      </div>

      {/*  Login Popup */}
      {showLoginPopup && (
        <div className="login-popup">
          <div className="login-popup-content">
            <h2>{language === "ar" ? "تسجيل الدخول" : "Login"}</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder={language === "ar" ? "كلمة المرور" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">{language === "ar" ? "دخول" : "Login"}</button>
              <button type="button" onClick={() => setShowLoginPopup(false)}>
                {language === "ar" ? "إغلاق" : "Close"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPortal;



