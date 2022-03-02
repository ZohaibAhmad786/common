import moment from "moment";
import * as Actions from "../ActionTypes";

const INITIAL_STATE = {
  deliveryAddress:{},
  anotherEcho:{},
  last_seen:[],
  showDeliveryAddressModal:false,
  defaultCountry: {
    id: 91,
    code: null,
    name: "Kuwait",
    short_name: "kw",
    alpha3: "kwt",
    flag: "https://api.taketo.exodevs.com/flags/128x128/kw.png",
    land_mark: "https://api.taketo.exodevs.com/admin-theem/dist/img/no-image-icon-6.png",
  },
  countriesList: [],
  selectedShopAddress: "",
  selectedDeliveryAddress: "",
  langauge: {},
  localFilter: {
    to_latitude: '',
    to_longitude: '',
    no_delivery: true,
    trip_type: 1,
    max_price: 0,
    reward: 0,
    is_urgent: 0,
    delivery_date:'',
    radius: 0,
    country_from: '',
    country_to: '',
    city_from: '',
    from_country_short_name:'',
    to_country_short_name:'',
    city_to: '',
    is_save: 0,
    full_address_from: '',
    full_address_to: '',
    //radio buttons
    isTwoDays: false,
    isThreeDays: true,
    //flags
    to_flag: '',
    from_flag: '',
    sort_by : '',
  },
  internationalFilter: {
    to_latitude: '',
    to_longitude: '',
    departure_date: '',
    returning_date: '',
    trip_type: 1,
    from_country_short_name:'',
    to_country_short_name:'',
    no_delivery: true,
    max_price: 0,
    reward: 0,
    is_urgent: 0,
    delivery_date: 'Up to 30 days',
    // radius: 0,
    country_from: '',
    country_to: '',
    city_from: '',
    city_to: '',
    is_save: false,
    full_address_from: '',
    full_address_to: '',
    //flags
    to_flag: '',
    from_flag: '',
    sort_by : '',
  },

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FETCH_LANGUAGE:
      return {
        ...state,
        langauge: action.payload,
      };
    case Actions.UPDATE_DEFAULT_COUNTRY:
      return {
        ...state,
        defaultCountry: action.payload,
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
    case Actions.SET_LAST_SEEN:
      return {
        ...state,
        last_seen: action.payload,
      };  
    case Actions.FETCH_DELIVERY_ADDRESS:
      return {
        ...state,
        selectedDeliveryAddress: action.payload,
      };
    case Actions.SET_LOGOUT:
      return {
        ...INITIAL_STATE,
        countriesList:state.countriesList,
        langauge:state.langauge,
        defaultCountry:state.defaultCountry
      };
    case Actions.SET_LOCAL_FILTER:
      return {
        ...state,
        localFilter: action.payload,
      };
    case Actions.SET_CLEAR_LOCAL_FILTER:
      return {
        ...state,
        localFilter: INITIAL_STATE.localFilter,
      };
    case Actions.SET_INTERNATIONAL_FILTER:
      return {
        ...state,
        internationalFilter: action.payload,
      };
    case Actions.SET_CLEAR_INTERNATIONAL_FILTER:
      return {
        ...state,
        internationalFilter: INITIAL_STATE.internationalFilter,
      };
    case Actions.DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    case Actions.FETCH_ECHO:
      return {
        ...state,
        anotherEcho: action.payload,
      };  
    case Actions.TOGGLE_DELIVERY_ADDREES_MODAL:
      return {
        ...state,
        showDeliveryAddressModal: action.payload,
      };
    default:
      return state;
  }
};
