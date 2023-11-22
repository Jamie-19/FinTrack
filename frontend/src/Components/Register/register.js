// src/Components/Register/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Registration successful")
        // Save the token to local storage or state and perform any necessary actions
        console.log('Registration successful');
        // Redirect to the login page after successful registration
        navigate('/');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <RegisterStyled>
      <h2>Register</h2>
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
        <p>Already have an account? <Link to="/">Login</Link></p>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </RegisterStyled>
  );
};

const RegisterStyled = styled.div`
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

export default Register;
