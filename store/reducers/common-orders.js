import * as Actions from "../ActionTypes";

const INITIAL_STATE = {
  local_international_orders_list: {},
  local_orders: {},
  international_orders: {},
  all_international_orders: {},
  popular_stores_list: {},
  //   filter_Orders_radius:[],
  filter_Orders: {},
  myOffersList: {},
  heigh_paid_orders: {},
  heigh_paid_orders_by_city: {},
  notifications_list: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications_list: action.payload,
      };
    case Actions.FETCH_POPULAR_STORES_LIST:
      return {
        ...state,
        popular_stores_list: action.payload,
      };

    case Actions.FETCH_HEIGH_PAID_ORDERS_LIST:
      return {
        ...state,
        heigh_paid_orders: action.payload,
      };
    case Actions.FETCH_HEIGH_PAID_ORDERS_LIST_BY_CITY:
      return {
        ...state,
        heigh_paid_orders_by_city: action.payload,
      };

    case Actions.FETCH_POSTED_ORDERS_LOCAL_AND_INTERNATIONAL_LIST:
      return {
        ...state,
        local_international_orders_list: action.payload,
      };

    case Actions.FETCH_LOCAL_POSTED_ORDERS_LIST:
      return {
        ...state,
        local_orders: action.payload,
      };

    case Actions.FETCH_INTERNATIONAL_POSTED_ORDERS_LIST:
      return {
        ...state,
        international_orders: action.payload,
      };

    case Actions.FETCH_ALL_INTERNATIONAL_POSTED_ORDERS_LIST:
      return {
        ...state,
        all_international_orders: action.payload,
      };
    case Actions.FILTER_ORDERS:
      return {
        ...state,
        filter_Orders:
          Object.keys(action.payload).length > 0
            ? action.payload
            : INITIAL_STATE.filter_Orders,
      };
   case Actions.FETCH_MY_OFFERS_LIST:
      return {
         ...state,
         myOffersList: action.payload,
            // Object.keys(action.payload).length > 0
            // ? action.payload
            // : INITIAL_STATE.myOffersList,
      };   
    //   case Actions.FILTER_ORDERS_RADIUS:
    //     return {
    //        ...state,
    //        filter_Orders_radius: action.payload,
    //     };

    case Actions.SET_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
