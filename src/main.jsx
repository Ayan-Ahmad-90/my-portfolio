import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./App"; // Importing MainApp instead of App
import "./index.css"; // Your global styles
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/my-portfolio">
      <MainApp />
    </BrowserRouter>
  </React.StrictMode>
);
