import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  answers: [],
  saves: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };

    case LOADING_USER:
      return {
        loading: true,
        ...state,
      };

    case SAVE_QUESTION:
      return {
        ...state,
        saves: [
          ...state.saves,
          {
            name: state.credentials.name,
            category: action.payload.category,
            questionId: action.payload.questionId,
          },
        ],
      };

    case UNSAVE_QUESTION:
      return {
        ...state,
        saves: state.saves.filter(
          (save) => save.questionId !== action.payload.questionId
        ),
      };

    default:
      return state;
  }
}
