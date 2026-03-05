import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Welcome() {
  const [logoutMsg, setLogoutMsg] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  useEffect(() => {
  const message = localStorage.getItem("logoutMessage");

  if (message) {
    setLogoutMsg(message);
    // remove stored message
    localStorage.removeItem("logoutMessage");
    // fade out after 5 seconds
    setTimeout(() => {
      setLogoutMsg("");
    }, 5000);
  }

}, []);
  const handleLogout = () => {
  localStorage.removeItem("username");
  // store logout message
  localStorage.setItem("logoutMessage", "You've been logged out successfully✅");
  navigate("/");
};

  return (
    <div className="container">
        {logoutMsg && (
            <div className="logout-message">
               {logoutMsg}
            </div>
            )}
      <h1>Welcome {username}🎉</h1>
      <button onClick={handleLogout}>Logout</button>

    </div>
  );
}

export default Welcome;