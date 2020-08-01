import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import RadioButton from '../elements/RadioButton';
import CancelIcon from '../images/cancelIcon.png';
import styled from 'styled-components';

const Profile = () => {
  return (
    <Layout>
      <Container></Container>
      <Link to='/'>
        <Button>
          <img width={40} src={CancelIcon} alt='cancel icon' />
        </Button>
      </Link>
    </Layout>
  );
};

export default Profile;

const Container = styled.div`
  background: white;
  width: 95%;
  max-width: 400px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0px 0px 1rem 1rem;
  padding-bottom: 6.5rem;
`;

const Button = styled(RadioButton)`
  width: 3rem;
  height: 3rem;
  background: #b2b2b2;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`;
