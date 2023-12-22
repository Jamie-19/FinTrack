// src/Components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useGlobalContext();
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);

  const handleAuth = async () => {
    try {
      const url = signIn
        ? 'http://localhost:5000/api/v1/login'
        : 'http://localhost:5000/api/v1/register';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(signIn ? 'Login successful' : 'Registration successful');
        localStorage.setItem('userid', data.userId);
        localStorage.setItem('username', data.username);
        setUserData({ username: data.username });
        navigate('/dashboard');
      } else {
        alert(signIn ? 'Login failed' : 'Registration failed');
        console.error(data.error);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <Body>
    <Container>
      <SignUpContainer signinIn={signIn}>
        <Form>
          <Title>Create Account</Title>
          <Input
            type='text'
            placeholder='Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleAuth}>
            {signIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </Form>
      </SignUpContainer>

      <SignInContainer signinIn={signIn}>
        <Form>
          <Title>Sign in</Title>
          <Input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Anchor href='#'>Forgot your password?</Anchor>
          
          <Button onClick={handleAuth}>Sign In</Button>
        </Form>
      </SignInContainer>

      <OverlayContainer signinIn={signIn}>
        <Overlay signinIn={signIn}>
          <LeftOverlayPanel signinIn={signIn}>
            <Title>Welcome Back!</Title>
            <Paragraph>Already have an account? Sign in now!</Paragraph>
            <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel signinIn={signIn}>
            <Title>Hello, Friend!</Title>
            <Paragraph>Don't have an account? Sign up now!</Paragraph>
            <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
    </Body>
  );
};

const Body = styled.body`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
  background-image: url('/Leonardo_Diffusion_XL_Generate_a_visually_stunning_and_futuris_2.jpg'); 
  background-blend-mode: overlay;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
`;


const Container = styled.div`
  backdrop-filter: blur(10px);
  set-visiblity: hidden;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0), 0 10px 10px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.278);
  `
      : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.278);
  opacity: 1;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
  opacity: ${(props) => (props.signinIn !== true ? `0` : `1`)}
`;

const Form = styled.form`
  background-color: rgba(1, 1, 1, 1);
  backdrop-filter: blur(10px);
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #ffffff;
`;

const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.278);
  backdrop-filter: blur(10px);
  color: #ffffff;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: rgba(0, 0, 0, 0.278);
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.278);
  backdrop-filter: blur(10px);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

export default Auth;
