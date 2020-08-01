import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Input from '../elements/Input';
import Button from '../elements/Button';
import styled from 'styled-components';

const Login = () => {
  return (
    <Layout barHeight='6.5rem'>
      <h1>Welcome back !</h1>

      <Container>
        <Input type='text' placeholder='Name' />
        <Input type='password' placeholder='Password' />
      </Container>

      <Container width='56%' gutterBottom>
        <Link to='/'>
          <Button fullWidth gutterBottom disabled>
            Log in
          </Button>
        </Link>
        <Link to='/signup'>
          <Button fullWidth>sign up</Button>
        </Link>
      </Container>
    </Layout>
  );
};

export default Login;

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : '60%')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => (props.gutterBottom ? '5rem' : 0)};
  width: ${(props) => props.width};
  z-index: ${(props) => props.front && 10};
  a {
    width: 100%;
  }
`;
