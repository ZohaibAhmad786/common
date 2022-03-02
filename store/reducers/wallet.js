import * as Actions from "../ActionTypes";

const INITIAL_STATE = {
  wallet_history: {},
  wallet_refund: {},
  wallet_payout: {},
  wallet_delivery: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FETCH_WALLET_HISTORY_LIST:
      return {
        ...state,
        wallet_history: action.payload,
      };

    case Actions.FETCH_WALLET_REFUND_DETAILS:
      return {
        ...state,
        wallet_refund: action.payload,
      };

    case Actions.FETCH_WALLET_PAYOUT_DETAILT:
      return {
        ...state,
        wallet_payout: action.payload,
      };

    case Actions.FETCH_WALLET_DELIVERY_DETAILS:
      return {
        ...state,
        wallet_delivery: action.payload,
      };

    case Actions.SET_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
