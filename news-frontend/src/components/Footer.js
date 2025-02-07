import React from "react";
import "../styles/Footer.css";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
        <div className="footer-column social-section">
            <h4>مشاهدة على تويتر</h4>
            <div className="subscribe">
            <div className="social-icons">
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>

              <div class="subscribe-box">
                  <button>اشترك</button>
                  <input type="email" placeholder="أدخل بريدك الإلكتروني" />
              </div>


              </div>

            </div>
           
          </div>
          
          <div className="footer-column">
            <h4>بما تطلبه</h4>
            <p className="underlined" >هناك العديد من الأنواع بعض العبارات أو الكلمات عليك أن تتحقق أولاً أن</p>
          </div>
          <div className="footer-column">
            <h4>بما تطلبه</h4>
            <p className="underlined">هناك العديد من الأنواع بعض العبارات أو الكلمات عليك أن تتحقق أولاً أن</p>
          </div>
          <div className="footer-column">
            <h4>بما تطلبه</h4>
            <p className="underlined">هناك العديد من الأنواع بعض العبارات أو الكلمات عليك أن تتحقق أولاً أن</p>
          </div>
         
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
