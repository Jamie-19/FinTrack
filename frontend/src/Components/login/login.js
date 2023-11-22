// src/Components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data + "dadsadaad");

      if (response.ok) {
        alert("Login successful")
        // Save the token to local storage or state and perform any necessary actions
        console.log('Login successful');
        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('An error occurred', error);
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
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
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
