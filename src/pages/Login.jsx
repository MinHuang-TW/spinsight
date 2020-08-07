import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, clearErrors } from '../redux/actions/userActions';

import Layout from '../components/Layout';
import Progress from '../components/Progress';
import Alert from '../elements/Alert';
import Input from '../elements/Input';
import Button from '../elements/Button';
import styled from 'styled-components';

const Login = ({
  loginUser,
  clearErrors,
  history,
  UI: { loading, errors },
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <Layout barHeight='6.5rem' width='62%' margin='0 auto 5rem'>
      {loading && <Progress login />}
      {errors && <Alert>{Object.values(errors)}</Alert>}

      <h1>Welcome back !</h1>
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

      <div>
        <Button
          type='submit'
          form='loginForm'
          fullWidth
          gutterBottom
          disabled={email.trim() === '' || password.trim() === ''}
        >
          Log in
        </Button>

        <Link to='/signup'>
          <Button onClick={clearErrors} fullWidth>
            sign up
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);

const LoginForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
