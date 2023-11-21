// src/Components/Login/Login.js
import React, { useState } from 'react';
import styled from 'styled-components';



const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add your authentication logic here
    // For simplicity, let's just check if the username and password are not empty
    if (username && password) {
      onLogin(); // Call the onLogin function passed from the parent component
    } else {
      alert('Please enter a valid username and password.');
    }
  };

  return (
    <LoginStyled>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href='/dashboard'  >
          Login
        </a>
      </form>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default Login;
