import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function WelcomeAlert() {
  const [show, setShow] = useState(false);

  // 1 second बाद alert show करो
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show होने के 6 second बाद auto hide
  useEffect(() => {
    if (!show) return;
    const hideTimer = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(hideTimer);
  }, [show]);

  if (!show) return null;

  return (
    <div variant>
    <Alert variant="success"  onClose={() => setShow(false)}   style={{
        background: "linear-gradient(135deg,'#06b6d4')",
        color: "#22587fff",
        border: "none",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0, 131, 232, 0.15)",
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        animation: "fadeIn 0.5s ease-in-out"
        }} dismissible  >
      <Alert.Heading>🎉 Welcome to My Portfolio!</Alert.Heading>
      <p>
        Thanks for visiting! My portfolio is now running successfully.  
        Explore my projects, skills, and achievements — I hope you enjoy your stay here. 🚀
      </p>
    </Alert>
    </div>
  );
}

export default WelcomeAlert;
