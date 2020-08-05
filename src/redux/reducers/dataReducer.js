import {
  SET_QUESTION,
  SET_QUESTIONS,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
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
        loading: false,
      };

    case SAVE_QUESTION:
    case UNSAVE_QUESTION:
      let index = state.questions.findIndex(
        (question) => question.questionId === action.payload.questionId
      );
      state.questions[index] = action.payload;
      // if (state.question.questionId === action.payload.questionId) {
      //   state.question = actions.payload;
      // }
      return {
        ...state,
      };

    case POST_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };

    default:
      return state;
  }
}
