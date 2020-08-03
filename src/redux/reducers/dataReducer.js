import {
  SET_QUESTIONS,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
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

    case SAVE_QUESTION:
    case UNSAVE_QUESTION:
      let index = state.questions.findIndex(
        (question) => question.questionId === action.payload.questionId
      );
      state.questions[index] = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
}
