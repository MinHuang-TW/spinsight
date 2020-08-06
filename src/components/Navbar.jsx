import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import RadioButton from '../elements/RadioButton';
import HomeIcon from '../images/homeIcon.png';
import AddIcon from '../images/editIcon.png';
import styled from 'styled-components';

const Navbar = ({
  homepage,
  user: {
    credentials: { image },
  },
}) => {
  if (!localStorage.FBIdToken) return <Redirect to='/login' />;

  return (
    <Container>
      {homepage ? (
        <Link to='/addQuestion'>
          <RadioButton border aria-label='add question'>
            <img width={25} src={AddIcon} alt='add new question' />
          </RadioButton>
        </Link>
      ) : (
        <Link to='/'>
          <RadioButton border aria-label='home'>
            <img width={25} src={HomeIcon} alt='home icon' />
          </RadioButton>
        </Link>
      )}
      <Link to='/profile'>
        <RadioButton aria-label='profile'>
          <img width={56} src={image} alt='avatar' />
        </RadioButton>
      </Link>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Navbar);

const Container = styled.nav`
  width: 86%;
  max-width: 500px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  a {
    width: auto;
  }
  ${RadioButton} {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }
`;
