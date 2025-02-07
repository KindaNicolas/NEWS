import React, { useState } from "react";
import "../styles/MostRead.css";
import news7 from "../assets/news7.png"; // Replace with actual image pathimport React, { useState } from "react";

const MostRead = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const articles = [
    {
      title: "الكلمات العشوائية",
      content: "هناك العديد من الأنواع المختلفة لنصوص الرسوم، ولكن الغالبية لم تعدلها بشكل ما عند إدخال بعض الجمل أو الكلمات العشوائية في النص.",
    },
    {
      title: "مقالة شائعة 1",
      content: "هناك العديد من الأنواع المختلفة لنصوص الرسوم، ولكن الغالبية لم تعدلها.",
    },
    {
      title: "مقالة شائعة 2",
      content: "هناك العديد من الأنواع المختلفة لنصوص الرسوم، ولكن الغالبية لم تعدلها.",
    },
    {
      title: "مقالة شائعة 3",
      content: "هناك العديد من الأنواع المختلفة لنصوص الرسوم، ولكن الغالبية لم تعدلها.",
    },
  ];

  return (
    
    <div className="most-read-section">

      <div className="article-box">
        <img src={news7} alt="Advertisement" className="article-img" />
      </div>
      {/* Most Read Articles */}
      <div className="most-read-container">
        <h2 className="section-title">الأكثر قراءة</h2>
        {articles.map((article, index) => (
          <div key={index} className="collapsible-section">
            <div
              className={`section-header ${openSection === index ? "open" : ""}`}
              onClick={() => toggleSection(index)}
            >
               <button className={`toggle-btn ${openSection === index ? "active" : ""}`}>
                {openSection === index ? "-" : "+"}
              </button>
              <span>{article.title}</span>
             
            </div>
            {openSection === index && <div className="section-content">{article.content}</div>}
          </div>
        ))}
      </div>

      {/* Image Section Styled as Article */ }
      
    </div>
  );
};

export default MostRead;
