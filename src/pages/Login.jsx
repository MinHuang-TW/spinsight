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
  const [email, setEmail] = useState('test@mail.com');
  const [password, setPassword] = useState('123456');

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
    <Container>
      {loading && <Progress />}
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

        <small>
          Don't have an account?
          <StyledLink to='/signup' onClick={errors && clearErrors}>
            Sign Up
          </StyledLink>
        </small>
      </div>
    </Container>
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

const Container = styled(Layout).attrs({
  width: '62%',
  maxWidth: '260px',
  barHeight: '6.5rem',
  margin: '4rem auto 5rem',
})``;

const LoginForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.primary};
  margin-left: 4px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
