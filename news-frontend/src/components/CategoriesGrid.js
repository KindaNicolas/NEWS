import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CategoriesGrid.css";
import NewsDetails from "./NewsDetails";

// Default categories
const defaultCategories = [
  { category: "أخبار", image: "/assets/news.jpg", description: "آخر الأخبار والتقارير الحصرية" },
  { category: "رياضة", image: "/assets/sports.jpg", description: "أحدث الأخبار الرياضية والمباريات" },
  { category: "اقتصاد", image: "/assets/economy.jpg", description: "تحليل الأسواق المالية والاقتصاد" },
  { category: "ثقافة", image: "/assets/culture.jpg", description: "أخبار الفنون والموسيقى" },
  { category: "فيديو وصور", image: "/assets/media.jpg", description: "أفضل الفيديوهات والصور" },
];

const CategoriesGrid = ({ token }) => {
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch sorted categories from backend
  useEffect(() => {
    const fetchSortedCategories = async () => {
      try {
        const storedToken = localStorage.getItem("authToken"); // ✅ Get token from localStorage
        const response = await axios.get("http://127.0.0.1:8000/api/aggregates", {
          params: { period: "24_hours" },
          headers: { Authorization: `Bearer ${storedToken}` }, // ✅ Include token in headers
        });
        setCategories(response.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };
    

    fetchSortedCategories();
  }, [token]);

  // Handle category click (store visit)
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/visit",
        { category: category.category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`✅ Visit recorded for ${category.category}`);
    } catch (error) {
      console.error("❌ Failed to record visit", error);
    }
  };

  return (
    <div className="categories-container">
      {selectedCategory ? (
        <NewsDetails category={selectedCategory} onBack={() => setSelectedCategory(null)} />
      ) : (
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={category.category}
              className={`category-box ${index === 0 ? "large-category-box" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              <img src={category.image} alt={category.category} className="category-image" />
              <h3>{category.category}</h3>
              <button className="more-button">المزيد</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesGrid;
