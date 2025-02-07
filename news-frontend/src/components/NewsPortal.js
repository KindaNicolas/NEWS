import React, { useState, useEffect } from "react";
import "../App.css"; // Adjusted path for CSS file
import news1 from "../assets/news1.png";
import news2 from "../assets/news2.png";
import news3 from "../assets/news3.png";
import news4 from "../assets/news4.png";
import news5 from "../assets/news5.png";
import logo from "../assets/logo.png"; // Logo import

const images = [news1, news2, news3, news4, news5];

const NewsPortal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="outer-container">
      <div className="container">
        {/* Logo and Login */}
        <div className="header-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <p className="logo-text">الأخبار المحلية</p>
          </div>
          <button className="login-button">تسجيل الدخول</button>
        </div>

        {/* Navigation over carousel */}
        <div className="carousel-container">
          <div className="carousel">
            <img src={images[currentIndex]} alt="Main News" className="carousel-image" />
            <nav className="navbar">
              {[
                "الرئيسية",
                "أخبار",
                "اقتصاد",
                "رياضة",
                "ثقافة",
                "فيديو وصور",
                "آراء",
              ].map((category, index) => (
                <React.Fragment key={category}>
                  <a href="#" className="nav-item">{category}</a>
                  {index < 6 && <span className="nav-separator">|</span>}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Body content */}
        <div className="content-right">
          {/* Categories Section */}
          <div className="grid">
            {[
              { title: "اقتصاد", image: news2 },
              { title: "رياضة", image: news3 },
              { title: "أخبار", image: news4 },
              { title: "فيديو وصور", image: news5 },
            ].map((item) => (
              <div key={item.title} className="card">
                <img src={item.image} alt={item.title} />
                <div className="card-title">{item.title}</div>
              </div>
            ))}
          </div>

          {/* Most Read Section */}
          <div className="most-read">
            <h3>الأكثر قراءة</h3>
            <ul>
              {["العناوين المستهدفة", "مقال هام جدًا", "موضوع آخر مهم"].map((item) => (
                <li key={item} className="list-item">
                  {item} <button>+</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Copyright © website name</p>
        </footer>
      </div>
    </div>
  );
};

export default NewsPortal;
