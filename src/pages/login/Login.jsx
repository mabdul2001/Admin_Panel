import "./login.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
//const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Example password regex
const passwordRegex = /^(?=.*[a-z])|(?=.*[A-Z])|(?=.*\d)[a-zA-Z\d]{8,}$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fyp-ubit-backend.onrender.com/api/v1/users/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log(result);
      window.location.href = "/";
      // setToken(result.token); // Save the token in the state
    } catch (error) {
      console.error('Error logging in:', error);
    }
    try {
      let validationErrors = [];

      if (!emailRegex.test(email)) {
        validationErrors.push("Invalid email format");
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }

      if (!passwordRegex.test(password)) {
        validationErrors.push("Invalid Password");
        setPasswordError(
          "Invalid Password"
        );
      } else {
        setPasswordError("");
      }

      if (validationErrors.length > 0) {
        return; // Stop the login process if there are validation errors
      }

      // ... rest of the login logic (fetch request, etc.)
    } catch (error) {
      // ... error handling
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Admin Login</h2>
        <form onSubmit={(e)=> handleLogin(e)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="error-message">{passwordError}</span>}
        </div>
        <button type="submit">Login</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
