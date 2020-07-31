import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Input from '../elements/Input';
import Modal from '../elements/Modal';
import Button from '../elements/Button';
import AddIcon from '../images/addIcon.png';
import styled from 'styled-components';

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const url =
    'https://firebasestorage.googleapis.com/v0/b/spinsight-api.appspot.com/o';
  const avatars = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleAvatar = useCallback(
    (string) => () => {
      setAvatar(string);
    },
    []
  );

  return (
    <Layout>
      <Container guttertop front>
        <AddButton
          avatar={avatar}
          onClick={handleOpen}
          style={{
            boxShadow: avatar ? '0px 0px 5px rgba(0, 0, 0, 0.6)' : null,
          }}
        >
          <img
            width={avatar ? '100%' : 32}
            src={avatar ? `${url}/${avatar}.png?alt=media` : AddIcon}
            alt='add icon'
          />
        </AddButton>
        <Text>{avatar ? 'change' : 'choose'} your Avatar</Text>
      </Container>

      {isOpen && (
        <Modal top='8.5rem' long>
          <Grid>
            {avatars.map((avatar) => (
              <img
                key={`W${avatar}`}
                width='100%'
                src={`${url}/W${avatar}.png?alt=media`}
                alt={`Woman ${avatar}`}
                onClick={handleAvatar(`W${avatar}`)}
              />
            ))}
          </Grid>
          <Divider />
          <Grid>
            {avatars.map((avatar) => (
              <img
                key={`W${avatar}`}
                width='100%'
                src={`${url}/M${avatar}.png?alt=media`}
                alt={`Man ${avatar}`}
                onClick={handleAvatar(`M${avatar}`)}
              />
            ))}
          </Grid>
          <Button disabled={!avatar} onClick={handleClose}>
            Confirm
          </Button>
        </Modal>
      )}

      <Container>
        <Input type='text' placeholder='Name' />
        <Input type='password' placeholder='Password' />
        <Input type='password' placeholder='Confirm Password' />
      </Container>

      <Container width='56%' gutterBottom>
        <Link to='/login'>
          <Button fullWidth gutterBottom>
            Log in
          </Button>
        </Link>
        <Link to='/'>
          <Button fullWidth disabled>
            sign up
          </Button>
        </Link>
      </Container>
    </Layout>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  width: ${(props) => (props.width ? props.width : '60%')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.guttertop ? '5rem' : 0)};
  margin-bottom: ${(props) => (props.gutterBottom ? '5rem' : 0)};
  width: ${(props) => props.width};
  z-index: ${(props) => props.front && 10};
  a {
    width: 100%;
  }
`;

const AddButton = styled.button`
  width: 6rem;
  height: 6rem;
  border-radius: 6rem;
  background: white;
  padding: 0px;
  border: 0.2rem solid ${(props) => props.theme.primary};
  border-width: ${(props) => props.avatar && '0px'};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Text = styled.p`
  color: ${(props) => props.theme.secondary};
  margin-bottom: 0px;
  text-transform: capitalize;
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
  img {
    cursor: pointer;
  }
`;

const Divider = styled.hr`
  margin: 0px;
  width: 100%;
  border-width: 0px;
  height: 1px;
  background: ${(props) => props.theme.secondary};
  opacity: 0.5;
  margin: 1rem auto;
`;
