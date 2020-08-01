import React from 'react';
import Layout from '../components/Layout';
import RadioButton from '../elements/RadioButton';
import Title from '../elements/Title';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <Layout>
      <Title>Hello, Jane!</Title>

      <RadioButton size='8rem' border>
        Get a<br />
        Question
      </RadioButton>

      <Navbar homepage />
    </Layout>
  );
};

export default Home;
