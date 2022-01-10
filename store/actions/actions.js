import TAKE_2_API from "../../api/API";
import services from "../../api/services";
import TAKE_TO_MOCK from "../../utils/mock";
import * as Actions from "../ActionTypes";
import UI_API from "../services";
const fetchHomeOrders = () => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchHomeOrdersList();
      dispatch({
        type: Actions.FETCH_HOME_ORDERS_LIST,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

const fetchRelaventOrders = () => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchRelevantOrdersList();
      dispatch({
        type: Actions.FETCH_RELEVENT_ORDERS_LIST,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchPostedOrders = () => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchPostedOrdersInternationAndLocalList();
      dispatch({
        type: Actions.FETCH_POSTED_ORDER_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchProcessingOrders = () => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchProcessingOrdersList();
      dispatch({
        type: Actions.FETCH_PROCESSING_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchDeliveryOrders = () => {
  return async(dispatch, getState) => {
    try {
      const data = await TAKE_2_API.fetchDeliveryOrdersList();
      dispatch({
        type: Actions.FETCH_DELIVERY_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchDeliveryHistoryOrders = (local = null) => {
  return async(dispatch, getState) => {
    try {
      const response =await TAKE_2_API.fetchOrderDeliveryHistoryList(local);
      dispatch({
        type: Actions.FETCH_ORDER_DELIVERY_HISTORY_LIST,
        payload: response,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchDisputedOrders = (local = null) => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchDisputedOrdersList(local);
      dispatch({
        type: Actions.FETCH_DISPUTED_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchOrderHistory = (local = null) => {
  return async(dispatch, getState) => {
    try {
      const data = await TAKE_2_API.fetchOrderHistoryList(local);
      dispatch({
        type: Actions.FETCH_ORDER_HISTORY_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchPostedOrdersLocalAndInternational = (latitude = 33.55818742662511, longitude = 73.01439076363538) => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchPostedOrdersInternationAndLocalList(latitude, longitude);
      dispatch({
        type: Actions.FETCH_POSTED_ORDERS_LOCAL_AND_INTERNATIONAL_LIST,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchPostedLocalOrdersList = (latitude, longitude) => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchLocalPostedOrderList(latitude, longitude);
      dispatch({
        type: Actions.FETCH_LOCAL_POSTED_ORDERS_LIST,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const filterPostedLocalOrdersList = (payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.filterPostedLocalOrdersList(payload);
      dispatch({
        type: Actions.FILTER_ORDERS_RADIUS,
        payload: response?.data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error);
    }
  };
};

const fetchPostedInternationalOrdersList = () => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchInternationalPostedOrderList();
      dispatch({
        type: Actions.FETCH_INTERNATIONAL_POSTED_ORDERS_LIST,
        payload: response,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchAllPostedInternationalOrdersList = () => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchAllInternationalPostedOrderList();
      dispatch({
        type: Actions.FETCH_ALL_INTERNATIONAL_POSTED_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchPopularStores = () => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchPopularStoresList();
      dispatch({
        type: Actions.FETCH_POPULAR_STORES_LIST,
        payload: response,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchWalletHistory = () => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchWalletHistoryList();
      dispatch({
        type: Actions.FETCH_WALLET_HISTORY_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchWalletPayoutDetails = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchWalletPayoutDetails(order_id);
      dispatch({
        type: Actions.FETCH_WALLET_PAYOUT_DETAILT,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchWalletRefundDetails = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchWalletRefundDetails(order_id);
      dispatch({
        type: Actions.FETCH_WALLET_REFUND_DETAILS,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchWalletDeliveryDetails = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchWalletDeliveryDetails(order_id);
      dispatch({
        type: Actions.FETCH_WALLET_DELIVERY_DETAILS,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchSingleOrderHistoryOffers = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchOrderOffersRequestsList(order_id);
      dispatch({
        type: Actions.FETCH_ORDER_OFFERS_REQUESTS_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchOrderHistoryOffersDetails = (offer_id) => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchSigleOrderOffersRequestsDetails(offer_id);
      dispatch({
        type: Actions.FETCH_SINGLE_ORDER_OFFERS_REQUEST_DETAILS,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchSingleDeliverHistoryOrderDetails = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data = TAKE_2_API.fetchDeliveryHistoryOrderDetails(order_id);
      dispatch({
        type: Actions.FETCH_DELIVERY_HISTORY_ORDER_DETAILS,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

// get authenticated user details
const fetchUserInfo = () => {
  return async (dispatch, getState) => {
    try {
      const res = await TAKE_2_API.fetchUserDetails();
      dispatch({
        type: Actions.SET_USER_INFO,
        payload: res?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
//auth
const postRegisterData = (payload) => {
  return async (dispatch, getState) => {
    try {
      const data = await TAKE_2_API.postRegisterData(payload);
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const postSigninData = (payload) => {
  return async (dispatch, getState) => {
    try {
      // console.log(payload);
      const data = await TAKE_2_API.postSigninData(payload);
      const response = await TAKE_2_API.fetchUserDetails();
      dispatch({
        type: Actions.SET_USER_INFO,
        payload: response?.data || {},
      });
      dispatch({
        type: Actions.SET_GUEST,
        payload: false,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const resetRedux = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: Actions.SET_LOGOUT });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const onChangeGuest = (bool = false) => {
  return {
    type: Actions.SET_GUEST,
    payload: bool,
  };
};

const fetchCountriesList = () => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchCountriesList();
      dispatch({
        type: Actions.FETCH_COUNTRIES_LIST,
        payload: response?.data?.map(el=>({...el,isActive:false})),
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchShopAddress = (address) => {
  return {
    type: Actions.FETCH_SHOP_ADDRESS,
    payload: address,
  };
};

const fetchDeliveryAddress = (address) => {
  return {
    type: Actions.FETCH_DELIVERY_ADDRESS,
    payload: address,
  };
};

const addNewAddress = (payload) => {
  return async (dispatch, getState) => {
    try {
      console.log(payload);
      const data = await TAKE_2_API.addNewAdress(payload);
      const response = await TAKE_2_API.fetchUserDetails();

      dispatch({
        type: Actions.SET_USER_INFO,
        payload: response?.data || {},
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const updateUserProfile = (payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.updateUserProfile(payload);
      dispatch({
        type: Actions.SET_USER_INFO,
        payload: response?.data || {},
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const createOrder = (payload) => {
  return async (dispatch, getState) => {
    try {
      const data = await TAKE_2_API.createOrder(payload);
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const fetchCreatedOrders = () => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchCreatedOrders();
      dispatch({
        type: Actions.FETCH_MY_CREATED_ORDERS_LIST,
        payload: response || {},
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
//post/create new local/international trip
const createOrFilterTrip = (payload, isLocalTrip = true) => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.createOrFilterTrip(payload, isLocalTrip);
      dispatch({
        type: Actions.FILTER_ORDERS,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const makeOffer = (payload) => {

  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.makeOffer(payload);
      const refetchOrders = await TAKE_2_API.fetchHomeOrdersList();
      dispatch({
        type: Actions.FETCH_HOME_ORDERS_LIST,
        payload: refetchOrders?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const fetchLangauge = (language='en_EN') => {

  return async (dispatch, getState) => {
    try {
      const response = await client.get(`${services.auth.language}?search=short_name:${language}`)
      dispatch({
        type: Actions.FETCH_LANGUAGE,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const activeCountryList = (newList) => {
  return {
    type: Actions.FETCH_COUNTRIES_LIST,
    payload: newList,
  };
};


const TAKE_TO_ACTIONS = {
  fetchCreatedOrders,
  fetchShopAddress,
  fetchDeliveryAddress,
  fetchCountriesList,
  fetchHomeOrders,
  fetchRelaventOrders,
  fetchPostedOrders,
  fetchProcessingOrders,
  fetchDeliveryOrders,
  fetchDeliveryHistoryOrders,
  fetchDisputedOrders,
  fetchOrderHistory,
  fetchPostedOrdersLocalAndInternational,
  fetchPostedLocalOrdersList,
  //filter local orders
  filterPostedLocalOrdersList,
  fetchPostedInternationalOrdersList,
  fetchAllPostedInternationalOrdersList,
  fetchPopularStores,
  fetchWalletHistory,
  fetchWalletPayoutDetails,
  fetchWalletRefundDetails,
  fetchWalletDeliveryDetails,
  fetchSingleOrderHistoryOffers,
  fetchOrderHistoryOffersDetails,
  fetchSingleDeliverHistoryOrderDetails,
  //api integration
  fetchUserInfo,
  //post methods
  postRegisterData,
  postSigninData,
  resetRedux,
  onChangeGuest,

  addNewAddress,

  createOrder,
  updateUserProfile,
  createOrFilterTrip,
  makeOffer,
  fetchLangauge,
  activeCountryList

};

export default TAKE_TO_ACTIONS;
