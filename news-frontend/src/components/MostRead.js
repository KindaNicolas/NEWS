import React, { useState } from "react";
import "../styles/MostRead.css";
import adImage from "../assets/news8.png";

const MostRead = ({ language }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Example articles
  const articles = [
    {
      title: language === "ar" ? "الكلمات العشوائية" : "Random Words",
      content: language === "ar"
        ? "هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم ولكن الغالبية..."
        : "There are many types of Lorem Ipsum texts available, but most...",
    },
    {
      title: language === "ar" ? "هناك العديد من الأنواع المتوفرة" : "Various Types Available",
      content: language === "ar"
        ? "هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم ولكن الغالبية..."
        : "There are many types of Lorem Ipsum texts available, but most...",
    },
    {
      title: language === "ar" ? "هناك العديد من الأنواع المتوفرة" : "Many Available Types",
      content: language === "ar"
        ? "هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم ولكن الغالبية..."
        : "There are many types of Lorem Ipsum texts available, but most...",
    },
    {
      title: language === "ar" ? "هناك العديد من الأنواع المتوفرة" : "Plenty of Variations",
      content: language === "ar"
        ? "هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم ولكن الغالبية..."
        : "There are many types of Lorem Ipsum texts available, but most...",
    },
  ];

  // Toggle article expansion
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={`most-read-container ${language === "ar" ? "rtl" : "ltr"}`}>
      <div className="most-read-image">
        <img src={adImage} alt="Ad or Featured Content" />
      </div>

      <div className="most-read-articles">
        <h2 className="most-read-title">{language === "ar" ? "الأكثر قراءة" : "Most Read"}</h2>
        {articles.map((article, index) => (
          <div key={index} className={`article ${expandedIndex === index ? "expanded" : ""}`}>
            <div className="article-header" onClick={() => toggleExpand(index)}>
              <button className="expand-btn">{expandedIndex === index ? "-" : "+"}</button>
              <h3>{article.title}</h3>
            </div>
            {expandedIndex === index && <p className="article-content">{article.content}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
