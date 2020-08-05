import {
  SET_QUESTION,
  SET_QUESTIONS,
  LOADING_DATA,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
} from '../types';
import axios from 'axios';

export const getCategoryQuestions = (category) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`questions/${category}`)
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

export const setQuestion = (question) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  dispatch({
    type: SET_QUESTION,
    payload: question,
  });
  // axios
  //   .get(`question/${category}/${questionId}`)
  //   .then((res) => {
  //     dispatch({
  //       type: SET_QUESTION,
  //       payload: res.data,
  //     });
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: SET_QUESTION,
  //       payload: [],
  //     });
  //   });
};

export const saveQuestion = (category, questionId) => (dispatch) => {
  axios
    .get(`question/${category}/${questionId}/save`)
    .then((res) => {
      dispatch({
        type: SAVE_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const unsaveQuestion = (category, questionId) => (dispatch) => {
  axios
    .get(`question/${category}/${questionId}/unsave`)
    .then((res) => {
      dispatch({
        type: UNSAVE_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
