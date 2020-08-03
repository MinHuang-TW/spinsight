import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import Layout from '../components/Layout';
import Progress from '../components/Progress';
import Input from '../elements/Input';
import Button from '../elements/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Login = ({ loginUser, history, UI: { loading, errors } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const handleChange = useCallback(({ target: input }) => {
    if (input.name === 'email') setEmail(input.value);
    else setPassword(input.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const userData = { email, password };
      loginUser(userData, history);
    },
    [history, email, password, loginUser]
  );

  useEffect(() => {
    if (!errors) return;
    setError(errors);
  }, [errors]);

  return (
    <Layout barHeight='6.5rem' width='62%' margin='0 auto 5rem'>
      <h1>Welcome back !</h1>
      {loading && <Progress login />}
      {error && <p>{Object.values(error)}</p>}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser })(Login);

const LoginForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
