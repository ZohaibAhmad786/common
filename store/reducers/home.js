import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
  home_orders:[],
  userData: null,
  isGuest: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FETCH_HOME_ORDERS_LIST:
      return {
         ...state,
        home_orders: action.payload,
      };
   

    default:
      return state;
  }
};
