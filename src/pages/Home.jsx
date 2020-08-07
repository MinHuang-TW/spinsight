import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCategoryQuestions,
  setQuestion,
  saveQuestion,
  unsaveQuestion,
  submitAnswer,
  clearErrors,
} from '../redux/actions/dataActions';
import { randomize, getRotation, fetchCategory } from '../util/functions';

import Layout from '../components/Layout';
import Popup from '../components/Popup';
import Navbar from '../components/Navbar';
import Progress from '../components/Progress';

import Input from '../elements/Input.js';
import Button from '../elements/Button';
import RadioButton from '../elements/RadioButton';

import Star from '../images/star.png';
import Unstar from '../images/unstar.png';
import SpinWheel from '../images/spinWheel.png';
import Pointer from '../images/pointer.png';
import styled, { css, keyframes } from 'styled-components';

const Home = ({
  getCategoryQuestions,
  setQuestion,
  saveQuestion,
  unsaveQuestion,
  submitAnswer,
  clearErrors,
  user: {
    credentials: { name },
    saves,
  },
  data: { questions, question },
  UI: { errors, loading },
}) => {
  const [category, setCategory] = useState(null);
  const [answer, setAnswer] = useState('');
  const [clicked, setClicked] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [submited, setSubmited] = useState(false);

  const isSaved = useCallback(() => {
    if (
      saves &&
      saves.find(({ questionId }) => questionId === question.questionId)
    )
      return true;
    else return false;
  }, [saves, question]);

  const handleSave = useCallback(() => {
    saveQuestion(question.category, question.questionId);
  }, [question, saveQuestion]);

  const handleUnsave = useCallback(() => {
    unsaveQuestion(question.category, question.questionId);
  }, [question, unsaveQuestion]);

  const handleChange = useCallback(({ target: input }) => {
    setAnswer(input.value);
  }, []);

  const SaveButton = isSaved() ? (
    <StarButton src={Star} onClick={handleUnsave} />
  ) : (
    <StarButton src={Unstar} onClick={handleSave} />
  );

  const handleCancel = useCallback(
    ({ target }) => {
      if (target.tagName !== 'SECTION') return;
      if (!loading) setShowPopup(false);
      if (errors) clearErrors();
    },
    [errors, clearErrors, loading]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!category || !Object.keys(question).length) return;

      const { questionId } = question;
      submitAnswer(category, questionId, { answer });

      if (!loading && !errors) {
        setAnswer('');
        setSubmited(true);
        setCategory(null);
      }
    },
    [category, question, answer, submitAnswer, loading, errors]
  );

  const handleSpin = useCallback(() => {
    setSubmited(false);
    setClicked(true);

    const randomNumber = randomize(6); // return 0 - 5
    const randomCategory = fetchCategory(randomNumber);
    const randomRotation = getRotation(randomNumber);
    setCategory(randomCategory);
    setRotation(randomRotation);
  }, []);

  const handleSpinEnd = useCallback(() => {
    setClicked(false);
    if (Object.keys(question).length) setShowPopup(true);
  }, [question]);

  useEffect(() => {
    if (!category) return;
    getCategoryQuestions(category);
  }, [category, getCategoryQuestions]);

  useEffect(() => {
    if (questions.length && category) {
      const index = randomize(questions.length);
      const randomId = questions[index].questionId;
      setQuestion(category, randomId);
    }
  }, [questions, setQuestion]); // eslint-disable-line

  return (
    <Layout>
      <Popup
        category={loading ? null : submited ? 'OK' : question.category}
        open={showPopup}
        handleCancel={handleCancel}
      >
        <PopupForm onSubmit={handleSubmit}>
          {loading ? (
            <Progress nobg />
          ) : !submited ? (
            <>
              {SaveButton}
              <h2>{question.question}</h2>
              <Input
                type='text'
                name='answer'
                label='Answer'
                placeholder='Answer'
                value={answer}
                onChange={handleChange}
              />
              <Button
                type='submit'
                form='questionForm'
                disabled={answer.trim() === ''}
              >
                Submit
              </Button>
            </>
          ) : (
            <ul>
              {question.answers.map(({ answer }) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
          )}
        </PopupForm>
      </Popup>

      <h1>Hello, {name} !</h1>
      <WheelContainer>
        <RadioButton border onClick={handleSpin}>
          Get a Question
        </RadioButton>

        <img src={Pointer} alt='pointer' />
        <Wheel
          src={SpinWheel}
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
  getCategoryQuestions: PropTypes.func.isRequired,
  setQuestion: PropTypes.func.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  unsaveQuestion: PropTypes.func.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  getCategoryQuestions,
  setQuestion,
  saveQuestion,
  unsaveQuestion,
  submitAnswer,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);

const PopupForm = styled.form.attrs({
  id: 'questionForm',
})`
  width: 70%;
  margin: 2.5rem auto;
  ${Input} {
    margin: 2.5rem auto;
  }
`;

const StarButton = styled.img.attrs({
  alt: 'save/ unsave question',
})`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 24px;
  cursor: pointer;
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

const Wheel = styled.img.attrs({
  alt: 'spin wheel',
})`
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
