import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsPortal from "./components/NewsPortal"; // Import the main NewsPortal component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsPortal />} />
      </Routes>
    </Router>
  );
}

export default App;