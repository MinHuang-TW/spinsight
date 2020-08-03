import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

import Layout from '../components/Layout';
import LightBulb from '../components/LightBlub';
import RadioButton from '../elements/RadioButton';
import Button from '../elements/Button';
import Progress from '../components/Progress';
import Line from '../elements/Divider';
import CancelIcon from '../images/cancelIcon.png';
import {
  appearance,
  belongings,
  character,
  life,
  permanent,
  limited,
} from '../images/category';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CategoryBlock = ({ icon, amount, category }) => (
  <CategoryContainer amount={amount} color={category}>
    <img src={icon} alt={icon} />
    <p>{amount}</p>
  </CategoryContainer>
);

const Profile = ({
  logoutUser,
  user: {
    credentials: { name, image },
    answers,
    loading,
  },
}) => {
  const icons = [
    { appearance: appearance },
    { belongings: belongings },
    { character: character },
    { life: life },
    { permanent: permanent },
    { limited: limited },
  ];

  const handleLogout = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <Layout>
      {!loading ? (
        <Container>
          <LightBulb count={8} />
          {image ? (
            <img width={100} src={image} alt='avatar' />
          ) : (
            <div style={{ height: 100 }} />
          )}
          <Title>{name}</Title>

          <Divider>
            <p>{`${answers.length} Answers`}</p>
            <Line />
          </Divider>

          <Grid>
            {icons.map((icon, index) => (
              <CategoryBlock
                key={Object.keys(icon)}
                icon={Object.values(icon)}
                category={Object.keys(icon)}
                amount={index}
              />
            ))}
          </Grid>

          <Divider>
            <p>Questions</p>
            <Line />
          </Divider>

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
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(Profile);

const Container = styled.div`
  background: white;
  width: 95%;
  max-width: 400px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0px 0px 1rem 1rem;
  padding-bottom: 6.5rem;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1rem auto 0;
  color: ${(props) => props.theme.strong};
  opacity: 1;
`;

const Grid = styled.div`
  margin: auto;
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 1rem 2rem;
`;

const Divider = styled.div`
  height: 1.5rem;
  margin: 2rem auto;
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
  opacity: ${({ amount }) => (amount > 0 ? 1 : 0.2)};

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
