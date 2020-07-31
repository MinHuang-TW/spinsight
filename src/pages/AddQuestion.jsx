import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Title from '../elements/Title';
import Navbar from '../elements/Navbar';
import RadioButton from '../elements/RadioButton';
import HomeIcon from '../images/homeIcon.png';
import Avatar from '../images/avatar/W2.png';

const AddQuestion = () => {
  return (
    <Layout>
      <Title>Hello, Jane !</Title>

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
