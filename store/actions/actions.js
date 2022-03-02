import TAKE_2_API from "../../api/API";
import services from "../../api/services";
import TAKE_TO_MOCK from "../../utils/mock";
import * as Actions from "../ActionTypes";
import UI_API from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SET_CLEAR_INTERNATIONAL_FILTER } from "./../ActionTypes";

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

const fetchProcessingOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      const isAlreadyHasOrders =
        Object.keys(getState()?.order?.processing_orders)?.length > 0
          ? true
          : false;

      const response = await TAKE_2_API.fetchProcessingOrdersList(page);
      const newOrderList = isAlreadyHasOrders
        ? {
          data: [
            ...getState()?.order?.processing_orders?.data,
            ...response?.data,
          ],
          meta: response?.meta,
        }
        : response;

      dispatch({
        type: Actions.FETCH_PROCESSING_ORDERS_LIST,
        payload: newOrderList,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchDeliveryOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      const isAlreadyHasOrders =
        Object.keys(getState()?.order?.delivery_orders)?.length > 0
          ? true
          : false;

      const response = await TAKE_2_API.fetchDeliveryOrdersList(page);
      console.log('response:::', response);
      const newOrderList = isAlreadyHasOrders
        ? {
          data: [
            ...getState()?.order?.delivery_orders?.data,
            ...response?.data,
          ],
          meta: response?.meta,
        }
        : response;

      dispatch({
        type: Actions.FETCH_DELIVERY_ORDERS_LIST,
        payload: newOrderList,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchDeliveryHistoryOrders = (local = null) => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchOrderDeliveryHistoryList(local);
      dispatch({
        type: Actions.FETCH_ORDER_DELIVERY_HISTORY_LIST,
        payload: response,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchDisputedOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      const isAlreadyHasOrders = Object.keys(getState()?.menu_orders?.disputedOrders)?.length > 0 ? true : false

      const response = await TAKE_2_API.fetchDeliveryOrdersList(page);
      const newOrderList = isAlreadyHasOrders ? {
        data: [...getState()?.menu_orders?.disputedOrders?.data, ...response?.data],
        meta: response?.meta
      } : response;


      dispatch({
        type: Actions.FETCH_DELIVERY_ORDERS_LIST,
        payload: newOrderList,
      });
      const data = await TAKE_2_API.fetchDisputedOrdersList(page);
      dispatch({
        type: Actions.FETCH_DISPUTED_ORDERS_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const clearMenuPagination = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: Actions.FETCH_MY_OFFERS_LIST,
      payload: {},
    });
    dispatch({
      type: Actions.FETCH_DISPUTED_ORDERS_LIST,
      payload: {},
    });
    dispatch({
      type: Actions.FETCH_MY_CREATED_ORDERS_LIST,
      payload: {},
    });
  }
}
const fetchMyOffersList = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      const isAlreadyHasOrders = Object.keys(getState()?.menu_orders?.myOffersList)?.length > 0 ? true : false
      // if (bool) {
      const user_id = getState().auth.userInfo?.profile?.id
      const response = await TAKE_2_API.fetchMyOffersList(user_id, page);
      console.log('response::', response);
      // const response = await TAKE_2_API.fetchLocalPostedOrderList(latitude, longitude, page);

      const newOrderList = isAlreadyHasOrders ? {
        data: [...getState()?.menu_orders?.myOffersList?.data, ...response?.data],
        meta: response?.meta
      } : response;

      dispatch({
        type: Actions.FETCH_MY_OFFERS_LIST,
        payload: newOrderList,
      });

      // const user_id = getState().auth.userInfo?.profile?.id
      // const data = await TAKE_2_API.fetchMyOffersList(user_id);
      // dispatch({
      //   type: Actions.FETCH_MY_OFFERS_LIST,
      //   payload: data,
      // });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchOrderHistory = (local = null) => {
  return async (dispatch, getState) => {
    try {
      const data = await TAKE_2_API.fetchOrderHistoryList(local);
      console.log('data::', data);
      dispatch({
        type: Actions.FETCH_ORDER_HISTORY_LIST,
        payload: data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchPostedOrdersLocalAndInternational = (latitude, longitude) => {
  return async (dispatch, getState) => {
    try {
      const response =
        await TAKE_2_API.fetchPostedOrdersInternationAndLocalList(
          latitude,
          longitude
        );

      console.log(response);
      dispatch({
        type: Actions.FETCH_POSTED_ORDERS_LOCAL_AND_INTERNATIONAL_LIST,
        payload: response?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchPostedLocalOrdersList = (latitude, longitude, page = 1) => {
  return async (dispatch, getState) => {
    try {
      const isAlreadyHasOrders =
        Object.keys(getState()?.common_orders_list?.local_orders)?.length > 0
          ? true
          : false;
      // if (bool) {
      const response = await TAKE_2_API.fetchLocalPostedOrderList(
        latitude,
        longitude,
        page
      );

      const newOrderList = isAlreadyHasOrders
        ? {
          highPay_destinations: response?.highPay_destinations,
          local_orders: {
          data: [
            ...getState()?.common_orders_list?.local_orders
             ?.local_orders?.data,
            ...response?.local_orders?.data,
          ],
          meta: response?.local_orders?.meta,
        },
       }
        : response;

      dispatch({
        type: Actions.FETCH_LOCAL_POSTED_ORDERS_LIST,
        payload: newOrderList,
      });
      // }
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const filterPostedLocalOrdersList = (payload, isLocalOrder,limit=20) => {
  return async (dispatch, getState) => {
    try {
      console.log("radius payload:::", payload);
      const response = await TAKE_2_API.filterPostedLocalOrdersList(
        payload,
        isLocalOrder,
        limit
      );
      console.log("response::", response);
      dispatch({
        type: Actions.FILTER_ORDERS,
        payload: response,
      });
    } catch (error) {
      // throw new Error(error.message);
      console.log(error);
    }
  };
};

const fetchPostedInternationalOrdersList = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      const isAlreadyHasOrders =
        Object.keys(getState()?.common_orders_list?.international_orders)
          ?.length > 0
          ? true
          : false;
      const response = await TAKE_2_API.fetchInternationalPostedOrderList(page);
      console.log("response::", response);
      const newOrderList = isAlreadyHasOrders
        ? {
          highPay_destinations: response?.highPay_destinations,
          international_orders: {
            data: [
              ...getState()?.common_orders_list?.international_orders
                ?.international_orders?.data,
              ...response?.international_orders?.data,
            ],
            meta: response?.international_orders?.meta,
          },
        }
        : response;

      dispatch({
        type: Actions.FETCH_INTERNATIONAL_POSTED_ORDERS_LIST,
        payload: newOrderList,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchHeighPaidOrdersList = (isLocal) => {
  return async (dispatch, getState) => {
    try {

      const response = await TAKE_2_API.fetchHeighPaidOrderList(isLocal);
      dispatch({
        type: Actions.FETCH_HEIGH_PAID_ORDERS_LIST,
        payload: response,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchHeighPaidOrdersListByCity = (
  city_to,
  country_to,
  to_country_short_name,
  page = 1,
) => {
  return async (dispatch, getState) => {
    try {

      const isAlreadyHasOrders = Object.keys(getState()?.common_orders_list?.heigh_paid_orders_by_city)?.length > 0 ? true : false


      const response = await TAKE_2_API.fetchHeighPaidOrdersListByCity(
        city_to,
        country_to,
        to_country_short_name,
        page
      );

      const newOrderList = isAlreadyHasOrders ? {
        data: [...getState()?.common_orders_list?.heigh_paid_orders_by_city?.data, ...response?.data],
        meta: response?.meta
      } : response;

      console.log("response:", response)

      dispatch({
        type: Actions.FETCH_HEIGH_PAID_ORDERS_LIST_BY_CITY,
        payload: newOrderList,
      });






      // const response = await TAKE_2_API.fetchHeighPaidOrdersListByCity(
      //   city_to,
      //   country_to,
      //   to_country_short_name,
      //   page
      // );
      // console.log("response::", response);
      // dispatch({
      //   type: Actions.FETCH_HEIGH_PAID_ORDERS_LIST_BY_CITY,
      //   payload: response,
      // });
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
  return async (dispatch, getState) => {
    try {
      const data = await TAKE_2_API.fetchOrderOffersRequestsList(order_id);
      dispatch({
        type: Actions.FETCH_ORDER_OFFERS_REQUESTS_LIST,
        payload: data?.data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchOrderHistoryOffersDetails = (offer_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchSigleOrderOffersRequestsDetails(
        offer_id
      );
      dispatch({
        type: Actions.FETCH_SINGLE_ORDER_OFFERS_REQUEST_DETAILS,
        payload: response?.data,
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
// get authenticated user details
const fetchPublicUserInfo = (user_id) => {
  return async (dispatch, getState) => {
    try {
      const res = await TAKE_2_API.fetchPublicUserInfo(user_id);
      dispatch({
        type: Actions.SET_PUBLIC_USER_INFO,
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
      return data;
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const postSocialData = (payload, provider) => {
  return async (dispatch, getState) => {
    try {
      const data = await TAKE_2_API.postSocialData(payload, provider);

      const response = await TAKE_2_API.fetchUserDetails();

      dispatch({
        type: Actions.SET_USER_INFO,
        payload: response?.data || {},
      });

      dispatch({
        type: Actions.SET_GUEST,
        payload: false,
      });
      return data;
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
      AsyncStorage.setItem(
        "@Countries",
        JSON.stringify(
          response?.data?.map((el) => ({ ...el, isActive: false }))
        )
      );
      const request = await AsyncStorage.getItem("@location");
      const countriesList = response?.data?.map((el) => ({
        ...el,
        isActive: false,
      }));
      if (request) {
        const address = await UI_API._returnGeoCodeData(JSON.parse(request));
        const country = countriesList.find(
          (el) => el?.short_name === address?.country_short_name?.toLowerCase()
        );

        country !== undefined &&
          dispatch({
            type: Actions.UPDATE_DEFAULT_COUNTRY,
            payload: country,
          });
      }

      dispatch({
        type: Actions.FETCH_COUNTRIES_LIST,
        payload: countriesList,
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
      // console.log(JSON.stringify(response?.data))
      dispatch({
        type: Actions.SET_USER_INFO,
        payload: response?.data || {},
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const createOrder = (payload, isReOrder, endpoint) => {
  return async (dispatch, getState) => {
    try {
      const data = await TAKE_2_API.createOrder(payload, isReOrder, endpoint);
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const fetchCreatedOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {

      const isAlreadyHasOrders = Object.keys(getState()?.order?.my_orders)?.length > 0 ? true : false

      const response = await TAKE_2_API.fetchCreatedOrders(page);
      const newOrderList = isAlreadyHasOrders ? {
        data: page === 1 ? response?.data : [...getState()?.order?.my_orders?.data, ...response?.data],
        meta: response?.meta
      } : response;


      console.log("response:", response)
      dispatch({
        type: Actions.FETCH_MY_CREATED_ORDERS_LIST,
        payload: newOrderList,
      });


      // const response = await TAKE_2_API.fetchCreatedOrders();
      // dispatch({
      //   type: Actions.FETCH_MY_CREATED_ORDERS_LIST,
      //   payload: response || {},
      // });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
//post/create new local/international trip
const createOrFilterTrip = (payload, isLocalTrip = true, page = 1) => {
  console.log('final payload for trip for trip',payload);
  return async (dispatch, getState) => {
    try {
      const isAlreadyHasOrders =
        Object.keys(getState()?.common_orders_list?.filter_Orders)?.length > 0
          ? true
          : false;


      const response = await TAKE_2_API.createOrFilterTrip(
        payload,
        isLocalTrip,
        page
      );



      const newOrderList = isAlreadyHasOrders
        ? {
          data: [
            ...getState()?.common_orders_list?.filter_Orders?.data,
            ...response?.data,
          ],
          meta: response?.meta,
        }
        : response;

      console.log("response:", response);
      dispatch({
        type: Actions.FILTER_ORDERS,
        payload: newOrderList,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

//clear filter
const clearFilterOrders = () => {
  return {
    type: Actions.FILTER_ORDERS,
    payload: {},
  };
};

//clear filter
const clearBrowseOrders = () => {
  return {
    type: Actions.FETCH_HEIGH_PAID_ORDERS_LIST_BY_CITY,
    payload: {},
  };
};

const clearMyOffers = (offers) => {
  return {
    type: Actions.FETCH_MY_OFFERS_LIST,
    payload: offers,
  };
};

const clearLocalAndInternationalOrders = (offers) => {
  return (dispatch, getState) => {

    dispatch({
      type: Actions.FETCH_LOCAL_POSTED_ORDERS_LIST,
      payload: {},
    });

    dispatch({
      type: Actions.FETCH_INTERNATIONAL_POSTED_ORDERS_LIST,
      payload: {},
    });
  }
};



//set local filter data
const setOrResetLocalFilter = (payload, bool = true) => {
  return (dispatch, getState) => {
    try {
      if (bool) {
        dispatch({
          type: Actions.SET_LOCAL_FILTER,
          payload: payload,
        });
      } else {
        dispatch({
          type: Actions.SET_CLEAR_LOCAL_FILTER,
        });
      }
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const setOrResetInternationalFilter = (payload, bool = true) => {
  return (dispatch, getState) => {
    try {
      if (bool) {
        dispatch({
          type: Actions.SET_INTERNATIONAL_FILTER,
          payload: payload,
        });
      } else {
        dispatch({
          type: Actions.SET_CLEAR_INTERNATIONAL_FILTER,
        });
      }
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
const fetchLangauge = (language = "en") => {
  return async (dispatch, getState) => {
    try {
      const response = await client.get(
        `${services.auth.language}?search=short_name:${language}`
      );
      AsyncStorage.setItem("@language", JSON.stringify(response?.data));
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

const resetReducer = () => {
  return {
    type: Actions.SET_LOGOUT,
  };
};

const changeDefaultCountry = (newCountryObj) => {
  return {
    type: Actions.UPDATE_DEFAULT_COUNTRY,
    payload: newCountryObj,
  };
};

const fetchInboxList = () => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchInboxList();
      // console.log('response of inbox list:::',response);
      dispatch({
        type: Actions.FETCH_INBOX_LIST,
        payload: response,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchEcho = (echo) => {
  return {
    type: Actions.FETCH_ECHO,
    payload: echo,
  };
};

const fetchDeliveryAddress = (address) => {
  return {
    type: Actions.FETCH_DELIVERY_ADDRESS,
    payload: address,
  };
};

const updateInboxList = (data, id, counter) => {
  return (dispatch, getState) => {
    try {
      const thread_id = data?.thread_id;
      if (Object.keys(getState()?.inbox?.inboxList).length > 0) {
        let newData = [...getState()?.inbox?.inboxList?.data];
        let objIndex = newData?.findIndex((obj) => obj?.id === thread_id);

        newData[objIndex] = !counter ? {
          ...newData[objIndex],
          unread_count:
            id !== data?.owner_id
              ? newData[objIndex]?.unread_count + 1
              : newData[objIndex]?.unread_count,
          updated_at: getState()?.inbox?.inboxList?.data[objIndex]?.created_at,
          resources: {
            ...newData[objIndex]?.resources,
            latest_message: data,
          },
        } : {
          ...newData[objIndex],
          unread_count: 0
        }

        dispatch({
          type: Actions.FETCH_INBOX_LIST,
          payload: {
            data: newData,
          },
        });
      } else {
        dispatch({
          type: Actions.FETCH_INBOX_LIST,
          payload: {},
        });
      }
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchActiveChat = (thread_id, page_id) => {
  return async (dispatch, getState) => {
    try {
      const response = await TAKE_2_API.fetchActiveChat(thread_id, page_id);
      const oldChat = getState().inbox?.active_chat;
      //console.log('response of fetchActiveChat::', response);
      dispatch({
        type: Actions.OPEN_ACTIVE_THREAD_CHAT,
        payload: page_id? {
          ...response,
          data: oldChat?.data ? [...oldChat?.data, ...response?.data] : [...response?.data],
        }:{
          ...response,
          data: [...response?.data],
        },
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const newMessageArrived = (message) => {
  return (dispatch, getState) => {
    try {
      const oldChat = getState().inbox?.active_chat;
      // const response = await TAKE_2_API.fetchActiveChat(thread_id)
      //console.log('response of fetchActiveChat::', response);
      dispatch({
        type: Actions.OPEN_ACTIVE_THREAD_CHAT,
        payload: {
          ...oldChat,
          data: [message, ...oldChat?.data ],
        },
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const updateMessage = (message) => {
  return (dispatch, getState) => {
    try {
      const oldChat = getState().inbox?.active_chat;
      // let newData = [...oldChat?.data]
      // console.log("newDATA:", newData)
      // objIndex = newData.findIndex(obj => obj.id == message?.message_id)
      // newData[objIndex].unread = false
      dispatch({
        type: Actions.OPEN_ACTIVE_THREAD_CHAT,
        payload: {
          ...oldChat,
          data: [message, ...oldChat?.data]
        }
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const makeEmptyInbox = () => {
  return (dispatch, getState) => {
    try {

      dispatch({
        type: Actions.OPEN_ACTIVE_THREAD_CHAT,
        payload: {
        }
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};


const lastSeen = (thread_id, lastRead) => {
  return (dispatch, getState) => {
    try {
      const allChats = getState()?.common?.last_seen;
      let newData = [...allChats]
      console.log("newDATA:", newData)
      objIndex = newData.findIndex(obj => obj.id == message?.message_id)
      newData[objIndex].unread = false
      dispatch({
        type: Actions.SET_LAST_SEEN,
        payload: {
          ...oldChats,
          data: newData
        }
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
}

const onSaveDeliveryAddressToRedux = (payload) => {
  return (dispatch, getState) => {
    try {
      dispatch({
        type: Actions.DELIVERY_ADDRESS,
        payload: payload,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};
const toggleDeliveryAddressModal = (bool) => {
  return (dispatch, getState) => {
    try {
      dispatch({
        type: Actions.TOGGLE_DELIVERY_ADDREES_MODAL,
        payload: bool,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const fetchNotifications = (page = 1) => {
  return async (dispatch, getState) => {
    try {

      const isAlreadyHasOrders =
        Object.keys(getState()?.common_orders_list?.notifications_list)?.length > 0
          ? true
          : false;

      const response = await TAKE_2_API.fetchNotifications(page);
      const notifications_data =( page != 1 && isAlreadyHasOrders)
        ? {
          data: [
            ...getState()?.common_orders_list?.notifications_list?.data,
            ...response?.data,
          ],
          meta: response?.meta,
        }
        : response;

      dispatch({
        type: Actions.FETCH_NOTIFICATIONS,
        payload: notifications_data,
      });
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  };
};

const TAKE_TO_ACTIONS = {
  clearLocalAndInternationalOrders,
  clearBrowseOrders,
  clearMenuPagination,
  fetchNotifications,
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
  fetchMyOffersList,
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
  fetchHeighPaidOrdersList,
  fetchSingleDeliverHistoryOrderDetails,
  //api integration
  fetchUserInfo,
  //post methods
  postRegisterData,
  postSigninData,
  //social login
  postSocialData,
  resetRedux,
  onChangeGuest,

  addNewAddress,

  fetchEcho,

  createOrder,
  updateUserProfile,
  createOrFilterTrip,
  clearFilterOrders,
  clearMyOffers,
  makeOffer,
  fetchLangauge,
  activeCountryList,
  changeDefaultCountry,

  //Signout + RESET REDUCER
  resetReducer,
  //set or reset local filter
  setOrResetLocalFilter,

  fetchInboxList,
  updateInboxList,
  fetchActiveChat,

  newMessageArrived,
  updateMessage,

  //set or reset local international
  setOrResetInternationalFilter,

  //delivery address modal
  onSaveDeliveryAddressToRedux,
  toggleDeliveryAddressModal,

  //public profile info
  fetchPublicUserInfo,
  //paid destination by city
  fetchHeighPaidOrdersListByCity,

  lastSeen,
  makeEmptyInbox,
};

export default TAKE_TO_ACTIONS;