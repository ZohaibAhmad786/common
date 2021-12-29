import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
  userInfo: null,
  isGuest: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case Actions.SET_GUEST:
      return {
        ...state,
        isGuest: action.payload,
      };
    default:
      return state;
  }
};
