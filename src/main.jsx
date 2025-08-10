import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./App"; // Importing MainApp instead of App
import "./index.css"; // Your global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainApp /> {/* Using MainApp here */}
  </React.StrictMode>
);
