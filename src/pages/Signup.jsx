import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Input from '../elements/Input';
import Modal from '../elements/Modal';
import Button from '../elements/Button';
import Divider from '../elements/Divider';
import AddIcon from '../images/addIcon.png';
import { WomenAvatars, MenAvatars } from '../images/avatar';
import styled from 'styled-components';

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleAvatar = useCallback(
    (avatar) => () => {
      setAvatar(avatar);
    },
    []
  );

  return (
    <Layout width='62%' margin='5rem auto'>
      <AddContainer>
        <AddButton avatar={avatar} onClick={handleOpen}>
          <img
            width={avatar ? '100%' : 32}
            src={avatar || AddIcon}
            alt='add icon'
          />
        </AddButton>
        <Text>{avatar ? 'change' : 'choose'} your Avatar</Text>
      </AddContainer>

      <AvatarModal open={isOpen}>
        <Grid>
          {WomenAvatars.map((photo) => (
            <Photo
              key={photo}
              src={photo}
              alt='woman avatar'
              selected={photo === avatar}
              onClick={handleAvatar(photo)}
            />
          ))}
        </Grid>
        <Divider />
        <Grid>
          {MenAvatars.map((photo) => (
            <Photo
              key={photo}
              src={photo}
              alt='man avatar'
              selected={photo === avatar}
              onClick={handleAvatar(photo)}
            />
          ))}
        </Grid>
        <Button disabled={!avatar} onClick={handleClose}>
          Confirm
        </Button>
      </AvatarModal>

      <SignupForm>
        <Input name='text' type='text' label='Name' placeholder='Name' />
        <Input
          name='password'
          type='password'
          label='Password'
          placeholder='Password'
        />
        <Input
          name='confirm password'
          type='password'
          label='Confirm Password'
          placeholder='Confirm Password'
        />
      </SignupForm>

      <Link to='/login'>
        <Button fullWidth gutterBottom>
          Log in
        </Button>
      </Link>
      <Button type='submit' fullWidth>
        sign up
      </Button>
    </Layout>
  );
};

export default Signup;

const AvatarModal = styled(Modal)`
  bottom: 0px;
  padding-top: 0;
  top: ${(props) => (props.open ? '8.5rem' : '150vh')};
  border-radius: 0.5rem 0.5rem 0 0;
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

const SignupForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  padding: 0 1.5rem;
  box-sizing: border-box;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  &:first-of-type {
    margin-top: 7rem;
  }
`;

const Photo = styled.img`
  cursor: pointer;
  width: 100%;
  position: relative;
  border-radius: 50%;
  box-shadow: ${(props) =>
    props.selected && `0 0 8px 3px ${props.theme.primary}`};
`;
