import React from "react";
import "../styles/NewsDetails.css";

const NewsDetails = ({ category, onBack, language }) => {
  return (
    <div className={`news-details ${language === "ar" ? "rtl" : "ltr"}`}>
      <button className="back-button" onClick={onBack}>
        {language === "ar" ? "العودة" : "Back"}
      </button>
      <img src={category.image} alt={category.category} className="news-image" />
      <h2>{language === "ar" ? category.category : category.category_en}</h2>
      <p>{language === "ar" ? "محتوى الأخبار لهذا القسم سيظهر هنا قريبًا..." : "News content for this section will be available soon..."}</p>
    </div>
  );
};

export default NewsDetails;
