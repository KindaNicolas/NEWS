import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use React 18 syntax
import { BrowserRouter } from "react-router-dom"; // ✅ Wrap App with BrowserRouter
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
