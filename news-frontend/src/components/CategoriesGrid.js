import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/CategoriesGrid.css";
import NewsDetails from "./NewsDetails";

import news1 from "../assets/news7.png";
import news2 from "../assets/news2.png";
import news3 from "../assets/news3.png";
import news4 from "../assets/news6.png";
import news5 from "../assets/news5.png";

const defaultCategories = [
  { category: "أخبار", category_en: "News", image: news1, total_clicks: 0 },
  { category: "رياضة", category_en: "Sports", image: news2, total_clicks: 0 },
  { category: "اقتصاد", category_en: "Economy", image: news3, total_clicks: 0 },
  { category: "ثقافة", category_en: "Culture", image: news4, total_clicks: 0 },
  { category: "فيديو وصور", category_en: "Media", image: news5, total_clicks: 0 },
];

const CategoriesGrid = ({ token, language }) => {
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchSortedCategories = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/aggregates", {
        params: { period: "24_hours" },
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      console.log(" API Response:", response.data);

      const updatedCategories = defaultCategories.map((defaultCategory) => {
        const matchingCategory = response.data.find(
          (cat) => cat.category === defaultCategory.category
        );
        return matchingCategory
          ? { ...defaultCategory, total_clicks: matchingCategory.total_clicks }
          : defaultCategory;
      });

      updatedCategories.sort((a, b) => b.total_clicks - a.total_clicks);

      setCategories(updatedCategories);
    } catch (error) {
      console.error("❌ Error fetching sorted categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchSortedCategories();
  }, [fetchSortedCategories, token]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      const storedToken = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/visit",
        { category: category.category },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      console.log(` Visit recorded for ${category.category}`);

      setTimeout(fetchSortedCategories, 1000);
    } catch (error) {
      console.error("❌ Failed to record visit", error);
    }
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
  };

  return (
    <div className={`categories-container ${language === "ar" ? "rtl" : "ltr"}`}>
      {selectedCategory ? (
        <NewsDetails category={selectedCategory} onBack={handleBackToHome} language={language} />
      ) : (
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={category.category}
              className="category-box"
              onClick={() => handleCategoryClick(category)}
            >
              <img src={category.image} alt={category.category} className="category-image" />
              <h3>{language === "ar" ? category.category : category.category_en}</h3>
              <button className="more-button">
                {language === "ar" ? "المزيد" : "More"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesGrid;
