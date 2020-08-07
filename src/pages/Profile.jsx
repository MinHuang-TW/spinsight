import React, { useCallback, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserData, logoutUser } from '../redux/actions/userActions';
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
            <p>{dataCount}</p>
          </CategoryContainer>
        );
      })}
    </Grid>
  </>
);

const Profile = ({
  getUserData,
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

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  if (!localStorage.FBIdToken) return <Redirect to='/login' />;

  return (
    <Layout>
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
              <img width={40} src={CancelIcon} alt='cancel icon' />
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
  getUserData: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserData, logoutUser })(Profile);

const Container = styled.div`
  background: white;
  width: 95%;
  height: 2000px;
  max-width: 400px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  /* border-radius: 0px 0px 1rem 1rem; */
  padding-bottom: 6.5rem;
  overflow-y: auto;
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
  margin: 1rem auto 0;
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
  grid-template-columns: repeat(3, auto);
  gap: 1rem 2rem;
`;

const Divider = styled.div`
  height: 1.5rem;
  position: relative;
  /* margin: 2rem auto; */

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
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const LogoutButton = styled(Button)`
  background: white;
  color: ${(props) => props.theme.primary};
  border: 1.5px solid ${(props) => props.theme.primary};
`;
