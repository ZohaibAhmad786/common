import TAKE_2_API from "../../api/API";
import TAKE_TO_MOCK from "../../utils/mock";
import * as Actions from "../ActionTypes";
const fetchHomeOrders = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchHomeOrdersList();
      dispatch({
        type: Actions.FETCH_HOME_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchRelaventOrders = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchRelevantOrdersList();
      dispatch({
        type: Actions.FETCH_RELEVENT_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};



const fetchPostedOrders = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchPostedOrdersInternationAndLocalList();
      dispatch({
        type: Actions.FETCH_POSTED_ORDER_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};



const fetchProcessingOrders = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchProcessingOrdersList();
      dispatch({
        type: Actions.FETCH_PROCESSING_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};


const fetchDeliveryOrders = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchDeliveryOrdersList();
      dispatch({
        type: Actions.FETCH_DELIVERY_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};


const fetchDeliveryHistoryOrders = (local=null) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchOrderDeliveryHistoryList(local)
      dispatch({
        type: Actions.FETCH_ORDER_DELIVERY_HISTORY_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchDisputedOrders = (local=null) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchDisputedOrdersList(local);
      dispatch({
        type: Actions.FETCH_DISPUTED_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchOrderHistory = (local=null) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchOrderHistoryList(local);
      dispatch({
        type: Actions.FETCH_ORDER_HISTORY_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchPostedOrdersLocalAndInternational = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchPostedOrdersInternationAndLocalList();
      dispatch({
        type: Actions.FETCH_POSTED_ORDERS_LOCAL_AND_INTERNATIONAL_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchPostedLocalOrdersList = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchLocalPostedOrderList();
      dispatch({
        type: Actions.FETCH_LOCAL_POSTED_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchPostedInternationalOrdersList = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchInternationalPostedOrderList();
      dispatch({
        type: Actions.FETCH_INTERNATIONAL_POSTED_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchAllPostedInternationalOrdersList = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchAllInternationalPostedOrderList();
      dispatch({
        type: Actions.FETCH_ALL_INTERNATIONAL_POSTED_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchPopularStores = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchPopularStoresList();
      dispatch({
        type: Actions.FETCH_POPULAR_STORES_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchWalletHistory = () => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchWalletHistoryList();
      dispatch({
        type: Actions.FETCH_WALLET_HISTORY_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchWalletPayoutDetails = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchWalletPayoutDetails(order_id);
      dispatch({
        type: Actions.FETCH_WALLET_PAYOUT_DETAILT,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchWalletRefundDetails = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchWalletRefundDetails(order_id);
      dispatch({
        type: Actions.FETCH_WALLET_REFUND_DETAILS,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchWalletDeliveryDetails = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchWalletDeliveryDetails(order_id);
      dispatch({
        type: Actions.FETCH_WALLET_DELIVERY_DETAILS,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};


const fetchSingleOrderHistoryOffers = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchOrderOffersRequestsList(order_id);
      dispatch({
        type: Actions.FETCH_ORDER_OFFERS_REQUESTS_LIST,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchOrderHistoryOffersDetails = (offer_id) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchSigleOrderOffersRequestsDetails(offer_id);
      dispatch({
        type: Actions.FETCH_SINGLE_ORDER_OFFERS_REQUEST_DETAILS,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};

const fetchSingleDeliverHistoryOrderDetails = (order_id) => {
  return (dispatch, getState) => {
    try {
      const data =  TAKE_2_API.fetchDeliveryHistoryOrderDetails(order_id);
      dispatch({
        type: Actions.FETCH_DELIVERY_HISTORY_ORDER_DETAILS,
        payload: data,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error)
    }
  };
};








const TAKE_TO_ACTIONS = {
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
  fetchPostedInternationalOrdersList,
  fetchAllPostedInternationalOrdersList,
  fetchPopularStores,
  fetchWalletHistory,
  fetchWalletPayoutDetails,
  fetchWalletRefundDetails,
  fetchWalletDeliveryDetails,
  fetchSingleOrderHistoryOffers,
  fetchOrderHistoryOffersDetails,
  fetchSingleDeliverHistoryOrderDetails
};

export default TAKE_TO_ACTIONS;
