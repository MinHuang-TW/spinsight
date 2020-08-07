import {
  SET_QUESTION,
  SET_QUESTIONS,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
  SUBMIT_ANSWER,
  POST_QUESTION,
  LOADING_DATA,
} from '../types';

const initialState = {
  questions: [],
  question: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };

    case SET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

    case SAVE_QUESTION:
    case UNSAVE_QUESTION:
      return {
        ...state,
      };

    case POST_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };

    case SUBMIT_ANSWER:
      return {
        ...state,
        question: {
          ...state.question,
          answers: [action.payload, ...state.question.answers],
        },
      };

    default:
      return state;
  }
}
