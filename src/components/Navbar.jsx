import React from 'react';
import { Link } from 'react-router-dom';
import RadioButton from '../elements/RadioButton';
import HomeIcon from '../images/homeIcon.png';
import AddIcon from '../images/editIcon.png';
import Avatar from '../images/avatar/W2.png';
import styled from 'styled-components';

const Navbar = ({ homepage }) => (
  <Container>
    {homepage ? (
      <Link to='/addQuestion'>
        <RadioButton border>
          <img width={25} src={AddIcon} alt='add new question' />
        </RadioButton>
      </Link>
    ) : (
      <Link to='/'>
        <RadioButton border>
          <img width={25} src={HomeIcon} alt='home icon' />
        </RadioButton>
      </Link>
    )}
    <Link to='/profile'>
      <RadioButton>
        <img width={56} src={Avatar} alt='avatar' />
      </RadioButton>
    </Link>
  </Container>
);

export default Navbar;

const Container = styled.div`
  width: 86%;
  max-width: 500px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;
