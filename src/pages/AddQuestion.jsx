import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Title from '../elements/Title';
import Navbar from '../elements/Navbar';
import RadioButton from '../elements/RadioButton';
import HomeIcon from '../images/homeIcon.png';
import Avatar from '../images/avatar/W2.png';
import Button from '../elements/Button';
import styled from 'styled-components';

const AddQuestion = () => {
  return (
    <Layout>
      <Title>Hello, Jane !</Title>

      <Container>
        <Subtitle>What would you like to ask your colleagues ?</Subtitle>
        <Main>
          <QuestionInput placeholder='Ask a Question...' />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='checkbox' />
            <p>Delete the question after 1 day.</p>
          </div>
        </Main>
        <Button style={{ margin: 0 }} disabled>
          submit
        </Button>
      </Container>

      <Navbar>
        <Link to='/'>
          <RadioButton border>
            <img width={25} src={HomeIcon} alt='home icon' />
          </RadioButton>
        </Link>
        <Link to='/profile'>
          <RadioButton>
            <img width={56} src={Avatar} alt='avatar' />
          </RadioButton>
        </Link>
      </Navbar>
    </Layout>
  );
};

export default AddQuestion;

const Subtitle = styled.h2`
  color: ${(props) => props.theme.secondary};
  font-size: 1.3rem;
  font-weight: 200;
  margin: 0;
`;

const Container = styled.section`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Main = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 0.85rem;
    color: ${(props) => props.theme.secondary};
    margin-left: 0.5rem;
  }
`;

const QuestionInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding-top: 0.25rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  border: 0.5px solid #9f9f9f;
  color: ${(props) => props.theme.secondary};
  box-sizing: border-box;

  &:-webkit-autofill {
    -webkit-text-fill-color: ${(props) => props.theme.secondary} !important;
  }
`;
