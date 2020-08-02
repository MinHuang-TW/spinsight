import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import RadioButton from '../elements/RadioButton';
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

const CategoryBlock = ({ icon, amount, category }) => (
  <CategoryContainer amount={amount} color={category}>
    <img src={icon} alt={icon} />
    <p>{amount}</p>
  </CategoryContainer>
);

const Profile = () => {
  const icons = [
    { appearance: appearance },
    { belongings: belongings },
    { character: character },
    { life: life },
    { permanent: permanent },
    { limited: limited },
  ];

  return (
    <Layout>
      <Container>
        <h1>Hello</h1>

        <Divider>
          <p>Answers</p>
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
      </Container>

      <Link to='/'>
        <Button aria-label='cancel'>
          <img width={40} src={CancelIcon} alt='cancel icon' />
        </Button>
      </Link>
    </Layout>
  );
};

export default Profile;

const Container = styled.div`
  background: white;
  width: 95%;
  max-width: 400px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0px 0px 1rem 1rem;
  padding-bottom: 6.5rem;
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

const Button = styled(RadioButton)`
  width: 3rem;
  height: 3rem;
  background: #b2b2b2;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`;
