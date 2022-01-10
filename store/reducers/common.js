import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
  countriesList:[],
  selectedShopAddress : "",
  selectedDeliveryAddress : "",
  langauge:{}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case Actions.FETCH_LANGUAGE:
      return {
        ...state,
        langauge: action.payload,
      };
      case Actions.FETCH_COUNTRIES_LIST:
      return {
        ...state,
        countriesList: action.payload,
      };

      case Actions.FETCH_SHOP_ADDRESS:
      return {
        ...state,
        selectedShopAddress: action.payload,
      };

      case Actions.FETCH_DELIVERY_ADDRESS:
      return {
        ...state,
        selectedDeliveryAddress: action.payload,
      };
     
   

    default:
      return state;
  }
};


