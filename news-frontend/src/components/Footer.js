import React, { useState } from "react";
import axios from "axios";
import "../styles/Footer.css";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = ({ language }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
  
    if (password !== confirmPassword) {
      setMessage("❌ كلمات المرور غير متطابقة");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }
      );
  
      // ✅ Check if response is success
      if (response.status === 201 || response.data.success) {
        setMessage("✅ تم التسجيل بنجاح!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage("❌ حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
  
      if (error.response?.data?.errors) {
        // ✅ Show detailed error messages from Laravel validation
        setMessage(Object.values(error.response.data.errors).flat().join("\n"));
      } else {
        setMessage("❌ فشل التسجيل. حاول مرة أخرى.");
      }
    }
  };
  
  

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column social-section">
            <h4>{language === "ar" ? "مشاهدة على تويتر" : "Follow us on Twitter"}</h4>
            <div className="subscribe">
              <div className="social-icons">
                <a href="#"><FaLinkedinIn /></a>
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>

                <div className="subscribe-box">
                  <button>{language === "ar" ? "اشترك" : "Subscribe"}</button>
                  <input type="email" placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"} />
                </div>
              </div>
            </div>

            {/*  Registration Form */}
            <form className="register-form" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder={language === "ar" ? "الاسم الكامل" : "Full Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <input
                type="password"
                placeholder={language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit">{language === "ar" ? "اشترك" : "Register"}</button>
            </form>
            {message && <p className="register-message">{message}</p>}
          </div>

          
          <div className="footer-column">
            <h4>{language === "ar" ? "بما تطلبه" : "What you need"}</h4>
            <p className="underlined">{language === "ar" ? "هناك العديد من الأنواع بعض العبارات أو الكلمات عليك أن تتحقق أولاً أن" : "There are many types of phrases or words you should check first."}</p>
          </div>
          <div className="footer-column">
            <h4>{language === "ar" ? "بما تطلبه" : "What you need"}</h4>
            <p className="underlined">{language === "ar" ? "هناك العديد من الأنواع بعض العبارات أو الكلمات عليك أن تتحقق أولاً أن" : "There are many types of phrases or words you should check first."}</p>
          </div>
          <div className="footer-column">
            <h4>{language === "ar" ? "بما تطلبه" : "What you need"}</h4>
            <p className="underlined">{language === "ar" ? "هناك العديد من الأنواع بعض العبارات أو الكلمات عليك أن تتحقق أولاً أن" : "There are many types of phrases or words you should check first."}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
