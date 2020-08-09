import {
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_DATA,
  SET_QUESTIONS,
  SET_QUESTION,
  POST_QUESTION,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
  SUBMIT_ANSWER,
  SET_ERRORS,
  CLEAR_ERRORS,
} from '../types';
import axios from 'axios';

export const getCategoryQuestions = (category) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/api/questions/${category}`)
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

export const setQuestion = (category, questionId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/api/question/${category}/${questionId}`)
    .then((res) => {
      dispatch({
        type: SET_QUESTION,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING_UI,
      });
    })
    .catch((err) => console.log(err));

  // dispatch({
  //   type: SET_QUESTION,
  //   payload: question,
  // });
};

export const postQuestion = (newQuestion) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/api/question`, newQuestion)
    .then((res) => {
      dispatch({
        type: POST_QUESTION,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const saveQuestion = (category, questionId) => (dispatch) => {
  axios
    .get(`/api/question/${category}/${questionId}/save`)
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
    .get(`/api/question/${category}/${questionId}/unsave`)
    .then((res) => {
      dispatch({
        type: UNSAVE_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const submitAnswer = (category, questionId, answer) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/api/question/${category}/${questionId}/answer`, answer)
    .then((res) => {
      dispatch({
        type: SUBMIT_ANSWER,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
