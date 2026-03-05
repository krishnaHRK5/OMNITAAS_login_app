import React, { useState, useEffect } from "react";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [logoutMsg, setLogoutMsg] = useState("");
    const [error, setError] = useState('');

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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://omnitaas-login-app-hrk.onrender.com/login', { username, password });
            if (response.status === 200) {
                localStorage.setItem('username', username);
                window.location.href = '/welcome';
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="main-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Please Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

                  {logoutMsg && (
                  <div className="logout-message">
               {logoutMsg}
                </div>
)}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;