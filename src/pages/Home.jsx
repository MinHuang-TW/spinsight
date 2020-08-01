import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Popup from '../components/Popup';
import RadioButton from '../elements/RadioButton';
import Navbar from '../components/Navbar';

const Home = () => {
  const [clicked, setClicked] = useState(false);

  const handleCancel = useCallback(({ target }) => {
    if (target.tagName !== 'SECTION') return;
    setClicked(false);
  }, []);

  return (
    <Layout>
      <h1>Hello, Jane !</h1>

      {clicked && (
        <Popup category='appearance' handleCancel={handleCancel}>
          <h2>Who has blue eyes?</h2>
        </Popup>
      )}
      <RadioButton size='8rem' border>
        Get a<br />
        Question
      </RadioButton>

      <Navbar homepage />
    </Layout>
  );
};

export default Home;
