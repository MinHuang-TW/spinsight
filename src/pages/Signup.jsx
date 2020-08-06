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

  const handleImage = useCallback(
    (avatar) => () => {
      setImage(avatar);
    },
    []
  );

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
        image,
      };
      signupUser(newUserData, history);
    },
    [signupUser, history, name, email, password, confirmPassword, image]
  );

  return (
    <Layout width='62%'>
      {loading && <Progress />}
      {errors && <Alert>{Object.values(errors)}</Alert>}

      <AddContainer>
        <AddButton avatar={image} onClick={handleOpen}>
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
            placeholder={type.name}
            onChange={handleChange}
            error={errors && Object.keys(errors).toString() === type.name}
            {...type}
          />
        ))}
      </SignupForm>

      <Link to='/login'>
        <Button fullWidth gutterBottom onClick={clearErrors}>
          Log in
        </Button>
      </Link>
      <SignupButton disabled={validation}>sign up</SignupButton>
    </Layout>
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

const SelectedAvatar = styled.img.attrs({
  alt: 'add icon',
})`
  width: ${(props) => (props.image ? '100%' : '32px')};
`;

const AvatarModal = styled(Modal)`
  bottom: 0px;
  margin-top: 5rem;
  padding-top: 7rem;
  top: ${(props) => (props.open ? '3rem' : '150vh')};
  border-radius: 0.5rem 0.5rem 0 0;
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  --webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
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
  margin-top: 5rem;
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
`;

const SignupForm = styled.form.attrs({
  id: 'signupForm',
})`
  height: 100%;
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
  fullWidth: true,
})`
  margin-bottom: 5rem;
`;
