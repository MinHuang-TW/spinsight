import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

const PopupContent = ({ submited, question, onChange, answer, SaveButton }) => {
  return (
    <>
      {!submited ? (
        <>
          {SaveButton}
          <h2>{question.question}</h2>
          <Input
            type='text'
            name='answer'
            label='Answer'
            placeholder='Answer'
            value={answer}
            onChange={onChange}
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
        <>
          <h2>All Answers</h2>
          <ul>
            {question.answers.map(({ answer }) => (
              <li key={answer}>{answer}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

PopupContent.propTypes = {};

export default PopupContent;
