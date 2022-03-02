import * as Actions from "../ActionTypes";

const INITIAL_STATE = {
  inboxList: {},
  active_chat: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FETCH_INBOX_LIST:
      return {
        ...state,
        inboxList: action.payload,
      };
    case Actions.OPEN_ACTIVE_THREAD_CHAT:
      return {
        ...state,
        active_chat: action.payload,
      };
    case Actions.SET_LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
