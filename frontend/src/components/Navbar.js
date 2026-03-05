import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const handleLogout = () => {
  localStorage.removeItem("username");
  // store logout message
  toast.success("You've successfully logged out");
  navigate("/");
};

  return (
    <div className="nav-con" style={styles.navbar}>
        <img src="https://cdn.prod.website-files.com/68d7e20358f7d78bc3bd1b84/68e3682c8e8615660803dd56_logo.avif" alt="Logo" className="logo"
/>
    <div className="navigation">
        {username && (
          <button style={styles.button} onClick={() => navigate("/welcome")}>
            Welcome
          </button>
        )}

        {username ? (
          <button style={styles.button} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button style={styles.button} onClick={() => navigate("/")}>
            Login
          </button>
        )}
      </div>

    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#282c34",
    color: "white",
    padding: "10px 20px"
  },
  button: {
    padding: "6px 12px",
    cursor: "pointer"
  }
};

export default Navbar;