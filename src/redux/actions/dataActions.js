import {
  SET_QUESTIONS,
  LOADING_DATA,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
} from '../types';
import axios from 'axios';

export const getQuestions = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get('/questions')
    .then((res) => {
      dispatch({
        type: SET_QUESTIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_QUESTIONS,
        payload: [],
      });
    });
};

export const saveQuestion = (questionId) => (dispatch) => {
  axios
    .get(`question/${questionId}/save`)
    .then((res) => {
      dispatch({
        type: SAVE_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const unsaveQuestion = (questionId) => (dispatch) => {
  axios
    .get(`question/${questionId}/unsave`)
    .then((res) => {
      dispatch({
        type: UNSAVE_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
