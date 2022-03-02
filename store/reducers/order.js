import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
  relavent_orders:{},
  posted_orders:{},
  processing_orders:{},
  delivery_orders:{},

  my_orders:{}
  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FETCH_MY_CREATED_ORDERS_LIST:
      return {
         ...state,
         my_orders: action.payload,
      };
   
      case Actions.FETCH_RELEVENT_ORDERS_LIST:
      return {
         ...state,
        relavent_orders: action.payload,
      };

      case Actions.FETCH_POSTED_ORDER_LIST:
      return {
         ...state,
        posted_orders: action.payload,
      };


      case Actions.FETCH_PROCESSING_ORDERS_LIST:
      return {
         ...state,
        processing_orders: action.payload,
      };


      case Actions.FETCH_DELIVERY_ORDERS_LIST:
      return {
         ...state,
        delivery_orders: action.payload,
      };
      case Actions.SET_LOGOUT:
        return INITIAL_STATE;
    default:
      return state;
  }
};
