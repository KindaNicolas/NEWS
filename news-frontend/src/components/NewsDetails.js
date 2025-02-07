import React from "react";
import "../styles/NewsDetails.css";

const NewsDetails = ({ category, onBack }) => {
  return (
    <div className="news-details">
      <button className="back-button" onClick={onBack}>العودة</button>
      <img src={category.image} alt={category.category} className="news-image" />
      <h2>{category.category}</h2>
      <p>محتوى الأخبار لهذا القسم سيظهر هنا قريبًا...</p>
    </div>
  );
};

export default NewsDetails;
