import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Title from '../elements/Title';
import Navbar from '../elements/Navbar';
import RadioButton from '../elements/RadioButton';
import AddIcon from '../images/editIcon.png';
import Avatar from '../images/avatar/W2.png';

const Home = () => {
  return (
    <Layout>
      <Title>Hello, Jane!</Title>

      <RadioButton size='8rem' border>
        Get a<br />
        Question
      </RadioButton>

      <Navbar>
        <Link to='/addQuestion'>
          <RadioButton border>
            <img width={25} src={AddIcon} alt='add new question' />
          </RadioButton>
        </Link>
        <Link to='profile'>
          <RadioButton>
            <img width={56} src={Avatar} alt='avatar' />
          </RadioButton>
        </Link>
      </Navbar>
    </Layout>
  );
};

export default Home;
