import * as Actions from "../ActionTypes";

const INITIAL_STATE = {
  userInfo: null,
  publicUserInfo:null,
  isGuest: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case Actions.SET_PUBLIC_USER_INFO:
      return {
        ...state,
        publicUserInfo: action.payload,
      };
    case Actions.SET_GUEST:
      return {
        ...state,
        isGuest: action.payload,
      };
    case Actions.SET_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
