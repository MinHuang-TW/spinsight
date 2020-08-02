import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Progress from '../components/Progress';
import Input from '../elements/Input';
import Button from '../elements/Button';
import styled from 'styled-components';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState({
    loading: false,
    errors: {},
  });

  const handleChange = useCallback(({ target: input }) => {
    if (input.name === 'email') setEmail(input.value);
    else setPassword(input.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setState({ loading: true });
      axios
        .post('/login', { email, password })
        .then((res) => {
          setState({ loading: false });
          history.push('/');
        })
        .catch((err) => {
          setState({ loading: false, errors: err.response.data });
        });
    },
    [history, email, password]
  );

  return (
    <Layout barHeight='6.5rem' width='62%' margin='0 auto 5rem'>
      <h1>Welcome back !</h1>
      {state.loading && <Progress login />}
      <LoginForm id='loginForm' onSubmit={handleSubmit}>
        <Input
          name='email'
          type='email'
          label='Email'
          placeholder='email'
          value={email}
          onChange={handleChange}
        />
        <Input
          name='password'
          type='password'
          label='Password'
          placeholder='Password'
          autoComplete='new-password'
          value={password}
          onChange={handleChange}
        />
      </LoginForm>

      <Button
        type='submit'
        form='loginForm'
        fullWidth
        gutterBottom
        disabled={email === '' || password === ''}
      >
        Log in
      </Button>

      <Link to='/signup'>
        <Button fullWidth>sign up</Button>
      </Link>
    </Layout>
  );
};

export default Login;

const LoginForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
