import * as Actions from "../ActionTypes";

const INITIAL_STATE = {
  history_orders: [],
  deliveredHistoryOrder: [],
  disputedOrders: [],
  orderyHistoryOffers: {},
  orderHistoryOfferDetails: {},
  deliverHistoryOrderDetial:{},
  myOffersList:{}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FETCH_MY_OFFERS_LIST:
      return {
        ...state,
        myOffersList: action.payload,
      };
    case Actions.FETCH_ORDER_HISTORY_LIST:
      return {
        ...state,
        history_orders: action.payload,
      };
    case Actions.FETCH_DISPUTED_ORDERS_LIST:
      return {
        ...state,
        disputedOrders: action.payload,
      };

    case Actions.FETCH_ORDER_DELIVERY_HISTORY_LIST:
      return {
        ...state,
        deliveredHistoryOrder: action.payload,
      };

    case Actions.FETCH_ORDER_OFFERS_REQUESTS_LIST:
      return {
        ...state,
        orderyHistoryOffers: action.payload,
      };

    case Actions.FETCH_SINGLE_ORDER_OFFERS_REQUEST_DETAILS:
      return {
        ...state,
        orderHistoryOfferDetails: action.payload,
      };
    case Actions.FETCH_DELIVERY_HISTORY_ORDER_DETAILS:
      return {
        ...state,
        deliverHistoryOrderDetial: action.payload,
      };
      case Actions.SET_LOGOUT:
        return INITIAL_STATE;
    default:
      return state;
  }
};
