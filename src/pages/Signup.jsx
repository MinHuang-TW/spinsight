import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser, clearErrors } from '../redux/actions/userActions';

import Layout from '../components/Layout';
import Progress from '../components/Progress';
import Alert from '../elements/Alert';
import Input from '../elements/Input';
import Modal from '../elements/Modal';
import Button from '../elements/Button';
import Divider from '../elements/Divider';

import AddIcon from '../images/addIcon.png';
import NoAvatar from '../images/avatar/noAvatar.svg';
import { WomenAvatars, MenAvatars } from '../images/avatar';
import styled from 'styled-components';

const Signup = ({
  signupUser,
  clearErrors,
  history,
  UI: { loading, errors },
}) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const inputTypes = [
    { name: 'name', type: 'text', value: name },
    { name: 'email', type: 'email', value: email },
    { name: 'password', type: 'password', value: password },
    { name: 'confirmPassword', type: 'password', value: confirmPassword },
  ];

  const validation =
    name.trim() === '' ||
    email.trim() === '' ||
    password.trim() === '' ||
    confirmPassword.trim() === '';

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleImage = useCallback((avatar) => () => setImage(avatar), []);

  const handleChange = useCallback(({ target: input }) => {
    switch (input.name) {
      case 'name':
        return setName(input.value);
      case 'email':
        return setEmail(input.value);
      case 'password':
        return setPassword(input.value);
      case 'confirmPassword':
        return setConfirmPassword(input.value);
      default:
        break;
    }
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const newUserData = {
        name,
        email,
        password,
        confirmPassword,
        image: image || NoAvatar,
      };
      signupUser(newUserData, history);
    },
    [signupUser, history, name, email, password, confirmPassword, image]
  );

  return (
    <Container>
      {loading && <Progress />}
      {errors && <Alert>{Object.values(errors)}</Alert>}

      <AddContainer>
        <AddButton avatar={image} onClick={handleOpen} open={isOpen}>
          <SelectedAvatar src={image || AddIcon} image={image} />
        </AddButton>
        <Text>{image ? 'change' : 'choose'} your Avatar</Text>
      </AddContainer>

      <AvatarModal open={isOpen}>
        <Grid>
          {WomenAvatars.map((avatar) => (
            <Avatar
              key={avatar}
              src={avatar}
              alt='woman avatar'
              selected={avatar === image}
              onClick={handleImage(avatar)}
            />
          ))}
        </Grid>
        <Divider />
        <Grid>
          {MenAvatars.map((avatar) => (
            <Avatar
              key={avatar}
              src={avatar}
              alt='man avatar'
              selected={avatar === image}
              onClick={handleImage(avatar)}
            />
          ))}
        </Grid>
        <Button disabled={!image} onClick={handleOpen}>
          Confirm
        </Button>
      </AvatarModal>

      <SignupForm onSubmit={handleSubmit}>
        {inputTypes.map((type) => (
          <SignupInput
            key={type.name}
            label={type.name}
            placeholder={`${type.name} ${
              type.name === 'password' ? '(at least 6 letters)' : ''
            }`}
            onChange={handleChange}
            error={errors && Object.keys(errors).toString() === type.name}
            {...type}
          />
        ))}
      </SignupForm>

      <div>
        <SignupButton disabled={validation} gutterBottom>
          sign up
        </SignupButton>
        <small>
          Have an account?
          <StyledLink to='/login' onClick={errors && clearErrors}>
            Log in
          </StyledLink>
        </small>
      </div>
    </Container>
  );
};

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);

const Container = styled(Layout).attrs({
  width: '62%',
  maxWidth: '260px',
  margin: '5rem auto',
})``;

const SelectedAvatar = styled.img.attrs({
  alt: 'add icon',
})`
  width: ${(props) => (props.image ? '100%' : '32px')};
`;

const AvatarModal = styled(Modal)`
  height: calc(100% - 5rem);
  padding-top: 7rem;
  top: ${(props) => (props.open ? '3rem' : '150vh')};
  border-radius: 0.5rem 0.5rem 0 0;

  --webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: 0;
  }
`;

const Text = styled.p`
  color: ${(props) => props.theme.secondary};
  margin-bottom: 0px;
  text-transform: capitalize;
`;

const AddContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  a {
    width: 100%;
  }
  ${Text} {
    margin-top: 1rem;
  }
`;

const AddButton = styled.button`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: white;
  padding: 0px;
  border: 0.2rem solid ${(props) => props.theme.primary};
  border-width: ${(props) => props.avatar && '0px'};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  -webkit-transform: ${(props) =>
    props.open && !props.avatar ? 'rotate(135deg)' : 'rotate(0)'};
  transform: ${(props) =>
    props.open && !props.avatar ? 'rotate(135deg)' : 'rotate(0)'};

  transition: ${(props) => !props.avatar && 'transform 0.2s ease-in-out'};
`;

const SignupForm = styled.form.attrs({
  id: 'signupForm',
})`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignupInput = styled(Input)`
  border-color: ${(props) => props.error && props.theme.appearance};
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  padding: 0 1.5rem;
  box-sizing: border-box;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
`;

const Avatar = styled.img`
  cursor: pointer;
  width: 100%;
  position: relative;
  border-radius: 50%;
  box-shadow: ${(props) =>
    props.selected && `0 0 8px 3px ${props.theme.primary}`};
`;

const SignupButton = styled(Button).attrs({
  type: 'submit',
  form: 'signupForm',
})`
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.primary};
  margin-left: 4px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
