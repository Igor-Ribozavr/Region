import { RECEIVE_DATA, ADD_REGION, DELETE_REGION } from './actionTypes';

const defaultState = {
  loading: false,
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return {
        ...state,
        loading: true,
        data: action.payload.filter((elem) => {
          if (elem.type === 1) {
            return elem;
          } else {
            return null;
          }
        }),
      };
    case ADD_REGION:
      return {
        ...state,
        loading: true,
        creature: action.payload,
      };
    case DELETE_REGION:
      return {
        ...state,
        loading: true,
        deleter: action.payload,
      };
    // case EDIT_REGION:
    //   return {
    //     ...state,
    //     loading: true,
    //     edit: action.payload,
    //   };
    default:
      return state;
  }
};
