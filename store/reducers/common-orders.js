import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
 
  local_international_orders_list:[],
  local_orders:{},
  international_orders:{},
  all_international_orders:{},
  popular_stores_list:{}

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

      case Actions.FETCH_POPULAR_STORES_LIST:
      return {
         ...state,
         popular_stores_list: action.payload,
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
   

    default:
      return state;
  }
};
