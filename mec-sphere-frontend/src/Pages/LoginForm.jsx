import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  // State variables to hold the username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Event handlers to update the state variables when inputs change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the login logic, such as sending the username and password to a server
    console.log('Username:', username);
    console.log('Password:', password);
    // Reset the form after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
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
