import React, { useEffect, useState } from "react";
import NewsCarousel from "../components/NewsCarousel";
import MostRead from "../components/MostRead";
import Footer from "../components/Footer";
import CategoriesGrid from "../components/CategoriesGrid";
import "../styles/HomePage.css"; // Import global styles

const HomePage = () => {
  const [token, setToken] = useState(undefined); // ✅ Use `undefined` to indicate "loading"

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      console.log("✅ Token found in localStorage:", savedToken);
    } else {
      console.log("❌ No token found in localStorage");
    }
    setToken(savedToken || null);
  }, []);

  if (token === undefined) {
    return <p>⏳ Checking authentication...</p>; // ✅ Show loading state
  }

  return (
    <div className="homepage-container">
  
      <div className="content-container">
        <NewsCarousel />
      </div>

      <div className="content-container">
        {token ? (
          <CategoriesGrid token={token} />
        ) : (
          <p>❌ No authentication token found. Redirecting to login...</p>
        )}
      </div>

      <div className="content-container">
        <MostRead />
      </div>

      <div className="content-container">
        <Footer />
      </div>


    </div>
  );
};

export default HomePage;





/*import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginModal from "../components/LoginModal";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(!isAuthenticated); // ✅ Show login if not authenticated

  useEffect(() => {
    if (!isAuthenticated) {
      console.warn("❌ No authentication token found. Showing login modal.");
      return;
    }
/*
    axios
      .get("http://127.0.0.1:8000/api/aggregates", {
        params: { period: "24_hours" },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log("✅ API Response:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching categories:", error.response);
        if (error.response && error.response.status === 401) {
          alert("❌ Session expired. Please log in again.");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setIsLoginModalOpen(true);
        }
      });
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div>
      <button onClick={() => setIsLoginModalOpen(true)}>
        {isAuthenticated ? "تسجيل الخروج" : "تسجيل الدخول"}
      </button>

      <LoginModal
        isOpen={isLoginModalOpen}
        closeModal={() => setIsLoginModalOpen(false)}
        setIsAuthenticated={setIsAuthenticated}
      />

      {isAuthenticated ? (
        <>
          <h2>التصنيفات الإخبارية</h2>
          {categories.length > 0 ? (
            <ul>
              {categories.map((category, index) => (
                <li key={index}>{category.category} - عدد النقرات: {category.total_clicks}</li>
              ))}
            </ul>
          ) : (
            <p>❌ لا توجد بيانات، تحقق من API أو قم بإضافة زيارات جديدة</p>
          )}
        </>
      ) : (
        <p>الرجاء تسجيل الدخول لعرض التصنيفات</p>
      )}
    </div>
  );
};

export default Home;

*/


/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch News Categories and Visits Data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/aggregates", {
        params: { period: "week" }, // ✅ Sending a valid period
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log("API Response:", response.data); // ✅ Log response
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.response);
      });
  }, []);
  

  // Handle category click (tracking visit)
  const handleClick = async (category) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/visit",
        { category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`You clicked on ${category}`);
    } catch (error) {
      console.error("Error tracking visit:", error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>News Categories</h2>

      <ul style={styles.list}>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li
              key={index}
              style={styles.listItem}
              onClick={() => handleClick(category.category)}
            >
              <span>{category.category}</span>
              <span>Total: {category.total_clicks} | Unique: {category.unique_clicks}</span>
            </li>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </ul>

      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

// Basic Styling
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "10px",
    background: "#f5f5f5",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoutButton: {
    marginTop: "20px",
    padding: "10px 15px",
    fontSize: "16px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
*/