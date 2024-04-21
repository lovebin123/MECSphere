import React, { useState, useContext } from "react";
import "./LoginForm.css";
import { Navigate, useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import AuthContext from "../contexts/AuthContext";

const LoginForm = () => {
  // State variables to hold the username and password
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { User, setUser } = useContext(AuthContext);

  // Event handlers to update the state variables when inputs change
  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    apiClient
      .post("/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // Save the token to local storage
        localStorage.setItem("token", response.data.token);
        setUser({
          id: response.data.id,
          name: response.data.name,
          token: response.data.token,
          role: response.data.role,
          status: true,
          email: response.data.email,
        });
        console.log(localStorage.getItem("token"));
        navigate("/dash");
      })
      .catch((error) => {
        alert(error);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
