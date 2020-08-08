import React, { useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import { categories, fetchIcon, count } from '../util/functions';

import Layout from '../components/Layout';
import LightBulb from '../components/LightBlub';
import RadioButton from '../elements/RadioButton';
import Button from '../elements/Button';
import Progress from '../components/Progress';
import Line from '../elements/Divider';
import CancelIcon from '../images/cancelIcon.png';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Block = ({ text, data, types }) => (
  <>
    <Divider>
      <p>
        {data.length} {text}
        {data.length > 0 ? 's' : ''}
      </p>
      <Line />
    </Divider>

    <Grid>
      {types.map((type) => {
        const dataCount = count(data, type);
        return (
          <CategoryContainer key={type} color={type} count={dataCount}>
            <img src={fetchIcon(type)} alt={type} />
            {dataCount ? <p>{dataCount}</p> : null}
          </CategoryContainer>
        );
      })}
    </Grid>
  </>
);

const Profile = ({
  logoutUser,
  user: {
    credentials: { name, image },
    saves,
    answers,
    loading,
  },
}) => {
  const handleLogout = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  if (!localStorage.FBIdToken) return <Redirect to='/login' />;

  return (
    <Layout height='auto' overflow='true'>
      {!loading ? (
        <Container>
          <LightBulb answers={answers} />
          <Avatar src={image} />
          <Title>{name}</Title>

          <Block types={categories} text='Answer' data={answers} />
          <Block types={categories} text='Save' data={saves} />

          <LogoutButton onClick={handleLogout}>log out</LogoutButton>

          <Link to='/'>
            <BackButton aria-label='cancel'>
              <img src={CancelIcon} alt='cancel icon' />
            </BackButton>
          </Link>
        </Container>
      ) : (
        <Progress />
      )}
    </Layout>
  );
};

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(Profile);

const Container = styled.div`
  background: white;
  width: 95%;
  height: auto;
  max-width: 400px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0px 0px 1rem 1rem;
  padding-bottom: 6.5rem;
  margin-bottom: 1rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Avatar = styled.img.attrs({
  alt: 'avatar',
})`
  width: 100px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0 auto 1.5rem;
  color: ${(props) => props.theme.strong};
  opacity: 1;
`;

const Grid = styled.div`
  margin: 2rem auto;
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 4rem);
  justify-content: space-between;
  row-gap: 1rem;
`;

const Divider = styled.div`
  height: 1.5rem;
  position: relative;

  ${Line},
  p {
    position: absolute;
    margin: 0px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    text-transform: uppercase;
    background: white;
    padding: 0 1rem;
    z-index: 1;
  }
`;

const CategoryContainer = styled.div`
  text-align: center;
  opacity: ${({ count }) => (count ? 1 : 0.2)};

  img {
    width: 100%;
    border-radius: 50%;
  }
  p {
    font-size: 18px;
    font-weight: 300;
    margin: 0;
    color: ${(props) => props.theme[props.color]};
  }
`;

const BackButton = styled(RadioButton)`
  width: 3rem;
  height: 3rem;
  background: #b2b2b2;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);

  img {
    width: 40px;
  }
`;

const LogoutButton = styled(Button)`
  background: white;
  width: 70%;
  color: ${(props) => props.theme.primary};
  border: 1.5px solid ${(props) => props.theme.primary};
  font-weight: bold;

  transition: all 0.4s ease-in-out;

  &:hover {
    color: white;
    background: ${(props) => props.theme.primary};
  }
`;
