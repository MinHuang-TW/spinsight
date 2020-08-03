import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getQuestions,
  saveQuestion,
  unsaveQuestion,
} from '../redux/actions/dataActions';

import Layout from '../components/Layout';
import Popup from '../components/Popup';
import Navbar from '../components/Navbar';
import Progress from '../components/Progress';
import Input from '../elements/Input.js';
import Button from '../elements/Button';
import RadioButton from '../elements/RadioButton';
import SpinWheel from '../images/spinWheel.png';
import Pointer from '../images/pointer.png';
import styled, { css, keyframes } from 'styled-components';

const Home = ({ getQuestions, name, data: { questions, loading } }) => {
  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleCancel = useCallback(({ target }) => {
    if (target.tagName !== 'SECTION') return;
    setShowPopup(false);
  }, []);

  const handleSpin = useCallback(() => {
    setClicked(true);
    const random = Math.floor(Math.random() * 6);
    const getRotation = (random) => 2160 + random * 60;
    switch (random) {
      case 0:
        setCategory('appearance');
        break;
      case 1:
        setCategory('limited');
        break;
      case 2:
        setCategory('character');
        break;
      case 3:
        setCategory('life');
        break;
      default:
      case 4:
        setCategory('permanent');
        break;
      case 5:
        setCategory('belongings');
        break;
    }
    setRotation(getRotation(random));
  }, []);

  const handleSpinEnd = useCallback(() => {
    setShowPopup(true);
    setClicked(false);
  }, []);

  useEffect(() => {
    getQuestions();
  }, []); // eslint-disable-line

  let displayedQuestion = !loading ? (
    questions.filter((q) => q.category === category)
  ) : (
    <Progress />
  );

  return (
    <Layout>
      <h1>Hello, {name} !</h1>

      <Popup category={category} open={showPopup} handleCancel={handleCancel}>
        <PopupContainer>
          <h2>
            {displayedQuestion.length > 0 && displayedQuestion[0].question}
          </h2>
          <Input
            type='text'
            name='answer'
            label='Answer'
            placeholder='Answer'
          />
          <Button>Submit</Button>
        </PopupContainer>
      </Popup>

      <WheelContainer>
        <RadioButton border onClick={handleSpin}>
          Get a Question
        </RadioButton>

        <img src={Pointer} alt='pointer' />
        <Wheel
          src={SpinWheel}
          alt='spin wheel'
          clicked={clicked}
          rotation={rotation}
          onAnimationEnd={handleSpinEnd}
        />
      </WheelContainer>

      <Navbar homepage />
    </Layout>
  );
};

Home.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  unsaveQuestion: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.credentials.name,
  data: state.data,
});

const mapActionsToProps = {
  getQuestions,
  saveQuestion,
  unsaveQuestion,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);

const PopupContainer = styled.div`
  width: 70%;
  margin: 3rem auto;
  ${Input} {
    margin: 3rem auto;
  }
`;

const spin = (rotation) => keyframes`
  0% {
    transform : translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform :
      translate(-50%, -50%) rotate(${rotation}deg);
  }
`;

const Wheel = styled.img`
  border-radius: 50%;
  transform-origin: center;
  ${(props) =>
    props.clicked &&
    css`
      --webkit-animation: ${(props) => spin(props.rotation)} 2s ease-in-out;
      animation: ${(props) => spin(props.rotation)} 2s ease-in-out;
    `}
`;

const WheelContainer = styled.div`
  position: relative;
  width: 90%;
  height: 100%;

  img,
  button {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  button,
  ${Wheel} {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }
  img {
    width: 100%;
    max-width: 400px;
  }
  img:first-of-type {
    z-index: 5;
  }

  ${RadioButton} {
    padding: 1rem;
    width: 8rem;
    height: 8rem;
  }
`;
