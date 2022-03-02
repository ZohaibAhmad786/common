import TAKE_TO_MOCK from "../utils/mock";
import axios from "axios";
import services from "./services";
import TAKE_TO_CONSTANT from "../utils/utils";
import UI_API from "../store/services";
import AsyncStorage from "@react-native-async-storage/async-storage";

// GET METHODS

const fetchHomeOrdersList = async () => {
  // home-orders
  const request = await client.get("home-orders");
  return request?.data; //TAKE_TO_MOCK.home_orders_list?.data;
};

const fetchRelevantOrdersList = async (latitude = 33.55818742662511, longitude = 73.01439076363538) => {
  // relevant-orders
  const request = await client.get(`${services.order.relevant_orders}?latitude=${latitude}&longitude=${longitude}`);
  // return TAKE_TO_MOCK.relevant_orders_list;
  return request?.data;
};
const fetchPostedOrdersInternationAndLocalList = async (latitude, longitude) => {
  // posted-orders
  let url = `${services.order.posted_orders}`;
  if (latitude && longitude) {
    url = `${services.order.posted_orders}?latitude=${latitude}&longitude=${longitude}`;
  }
  const request = await client.get(url);
  // return TAKE_TO_MOCK.posted_orders_list.data;
  return request?.data;
};
const fetchProcessingOrdersList = async (page) => {
  // processing-orders
  const request = await client.get(`${services.order.processing_orders}?page=${page}`);
  return request?.data; //TAKE_TO_MOCK.delivery_orders_list;
  // return TAKE_TO_MOCK.processing_orders_list;
};
const fetchDeliveryOrdersList = async (page) => {
  // completed-orders
  const request = await client.get(`${services.order.completed_orders}?page=${page}`);
  return request?.data; //TAKE_TO_MOCK.delivery_orders_list;
};

const fetchOfferData = async (order_id) => {
  // order-details-for-offer/1
  const response = await client.get(`${services.order.order_details_for_offer}/${order_id}`);
  return response?.data?.data; //TAKE_TO_MOCK.make_single_offer.data;
};

const fetchCompletedOfferData = async (order_id) => {
  //  order-details/4
  const response = await client.get(`${services.order.order_details}/${order_id}`);
  return response?.data?.data; //TAKE_TO_MOCK.make_single_offer.data;
};

const fetchPublicUserProfile = (user_id) => {
  //user/1
  return TAKE_TO_MOCK.make_single_offer;
};

const fetchLocalPostedOrderList = async (latitude, longitude, page) => {
  //true ? posted-local-orders
  let url = `${services.base_url}${services.order.posted_local_orders}?page=${page}`;
  if (latitude && longitude) {
    url = `${services.base_url}${services.order.posted_local_orders}?latitude=${latitude}&longitude=${longitude}&page=${page}`;
  }
  const request = await client.get(url); //?latitude=${latitude}&longitude=${longitude}`);
  // return TAKE_TO_MOCK.posted_orders_list.data;
  return request?.data;

};
//filter  orders on search map radius screen
const filterPostedLocalOrdersList = async (payload, isLocalOrder,limit) => {
  //true ? posted-local-orders
  payload = UI_API.getFormData(payload);
  const request = await client.post(`${isLocalOrder ? services.trip.local_trip : services.trip.international_trip}?page=1&limit=${limit}`, payload);
  return request?.data;

};
const fetchInternationalPostedOrderList = async (page) => {
  //t posted-heigh-paid-international-orders
  const request = await client.get(`${services.order.posted_heigh_paid_international_orders}?page=${page}`);
  // return TAKE_TO_MOCK.postedInternationalOrderList;
  return request?.data;
};

const fetchHeighPaidOrderList = async (isLocal) => {
  //t posted-heigh-paid-international-orders
  const request = await client.get(`${services.order.heigh_paid_destinations}?is_local=${isLocal}`);
  return request?.data;
};
// fetch high paid orders by city
const fetchHeighPaidOrdersListByCity = async (city_to, country_to, to_country_short_name,page) => {
  //t posted-heigh-paid-international-orders
  let url = `${services.order.posted_international_orders}?city_to=${city_to}&page=${page}`;
  if (country_to) {
    url += `&country_to=${country_to}&to_country_short_name=${to_country_short_name}`;
  }

  const request = await client.get(url);
  return request?.data;
};

// fetch high paid orders by city
const fetchHeighPaidOrdersListByCity = async (city_to, country_to, to_country_short_name,page) => {
  //t posted-heigh-paid-international-orders
  let url = `${services.order.posted_international_orders}?city_to=${city_to}&page=${page}`;
  if (country_to) {
    url += `&country_to=${country_to}&to_country_short_name=${to_country_short_name}`;
  }
  console.log("url:::", url);

  const request = await client.get(url);
  return request?.data;
};

const fetchAllInternationalPostedOrderList = () => {
  //posted-international-orders-all
  return TAKE_TO_MOCK.displayAllInternationalOrdersList;
};

const fetchOrderOffersRequestsList = async (order_id) => {
  // order-offers/76
  const request = await client.get(`${services.order.order_offers}/${order_id}`);
  return request?.data;
  // return //TAKE_TO_MOCK.orderOffersRequestsList.data;
};

const fetchSigleOrderOffersRequestsDetails = async (offer_id) => {
  // offer-details/6
  const request = await client.get(`${services.order.offer_details}/${offer_id}`);
  return request?.data; //TAKE_TO_MOCK.offerDetails.data;
};

const fetchOrderHistoryList = async (local = true) => {
  // true ? order-history-local : order-history-international
  const url=local?services.history_order.order_history_local:services.history_order.order_history_international;
  const request =  await client.get(url);
  return request?.data;
};

const fetchOrderDeliveryHistoryList = async (local = true) => {
  // true ? delivery-history-local : delivery-history-international
  const request = local ? await client.get(services.deliver_order.delivery_history_local) : await client.get(services.deliver_order.delivery_history_international);
  return request?.data;
};

const fetchDisputedOrdersList = async () => {
  // dispute-orders
  const request = await client.get(services.dipusted_order.dispute_orders);
  return request?.data; // TAKE_TO_MOCK.disputedOrderList;
};
const fetchMyOffersList = async (user_id,page) => {
  // my-offers
  const request = await client.get(`${services.create_order.my_offers}?page=${page}&search=traveller_id:${user_id};status:pending&searchJoin=and`);
  return request?.data; //TAKE_TO_MOCK.disputedOrderList;
};

const fetchDeliveryHistoryOrderDetails = (order_id) => {
  // deliverer-order-details/9
  return TAKE_TO_MOCK.signleDeliveryHistoryOrderDetails.data;
};

const fetchPopularStoresList = async () => {
  // popular-stores
  const request = await client.get(services.common.storeList);
  return request?.data; //TAKE_TO_MOCK.popularStoresList;
};

const fetchOTP = (is_Email_OTP = true) => {
  // true ? get-email-otp : get-mobile-otp
  return TAKE_TO_MOCK.make_single_offer;
};

const fetchWalletHistoryList = () => {
  // wallet-history
  return TAKE_TO_MOCK.walletHistoryList;
};

const fetchWalletDeliveryDetails = (order_id) => {
  // wallet-delivery-details/8
  return TAKE_TO_MOCK.walletDeliveryOrderDetails.data;
};

const fetchWalletPayoutDetails = (order_id) => {
  // wallet-payout-details
  return TAKE_TO_MOCK.walletPayoutOrderDetails.data;
};

const fetchWalletRefundDetails = (order_id) => {
  // wallet-refund-details
  return TAKE_TO_MOCK.walletRefundOrderDetails.data;
};

const fetchUserDetails = async () => {
  const res = await client.get(`${services.user.user_profile}`);
  return res.data;
};
//POST METHODS
const postRegisterData = async (data) => {
  const body = UI_API.getFormData(data);
  const res = await axios.post(`${services.base_url}${services.auth.register}`, body);
  // wallet-refund-details
  return res;
};
const postSigninData = async (data) => {
  const body = UI_API.getFormData({
    ...data,
    client_id: 2,
    client_secret: "b9vfVBmXV7Te9zJUyw14sL04gGOwgHvTvhA7ycBP",
    grant_type: "password",
  });
  const res = await axios.post(`${services.base_url}${services.auth.login}`, body);

  await AsyncStorage.setItem("@token", UI_API._returnStringify(res?.data));
  return res;
};
const postSocialData = async (data,provider) => {
 
  const body = UI_API.getFormData({
    ...data,
    social_provider:provider
  });
  const res = await axios.post(`${services.base_url}${services.auth.social}/${provider}`, body);

  await AsyncStorage.setItem("@token", UI_API._returnStringify(res?.data?.meta?.custom));
  return res;
};
const postEmailOtp = async (email) => {
  const body = UI_API.getFormData({ email });
  const res = await client.post(`${services.auth.email_otp}`, body);
  console.log('res:of email ot:',res?.data);
  return res;
};
//forgot password
const forgotPassword = async (email) => {
  const body = UI_API.getFormData({ email });
  const res = await axios.post(`${services.base_url}${services.auth.forgot}`, body);
  return res;
};
//reset password
const resetPassword = async (payload) => {
  console.log('final payload',payload);
  const body = UI_API.getFormData(payload);
  const res = await axios.post(`${services.base_url}${services.auth.reset}`, body);
  return res;
};

const postMobileOtp = async (mobile) => {
  const body = UI_API.getFormData({ mobile });
  const res = await client.post(`${services.auth.mobile_otp}`, body);
  return res;
};
const postDeviceToken = async (payload) => {
  const body = UI_API.getFormData(payload);
  const res = await client.post(`${services.auth.device_token}`, body);
  return res;
};
const verifyOTP = async (otp, type) => {
  const body = UI_API.getFormData({ otp, type });
  const res = await client.post(`${services.auth.verify_otp}`, body);
  console.log('res of otp::',res);
  return res;
};
//forgot password
const forgotPassword = async (email) => {
  const body = UI_API.getFormData({ email });
  const res = await axios.post(`${services.base_url}${services.auth.forgot}`, body);
  return res;
};
//reset password
const resetPassword = async (payload) => {
  const body = UI_API.getFormData(payload);
  const res = await axios.post(`${services.base_url}${services.auth.reset}`, body);
  return res;
};

const postMobileOtp = async (mobile) => {
  const body = UI_API.getFormData({ mobile });
  const res = await client.post(`${services.auth.mobile_otp}`, body);
  return res;
};
const postDeviceToken = async (payload) => {
  const body = UI_API.getFormData(payload);
  const res = await client.post(`${services.auth.device_token}`, body);
  return res;
};
const verifyOTP = async (otp, type) => {
  const body = UI_API.getFormData({ otp, type });
  const res = await client.post(`${services.auth.verify_otp}`, body);
  return res;
};

const fetchCountriesList = async () => {
  const res = await client.get(services.common.countires);
  // wallet-refund-details
  return res.data;
};
const addNewAdress = async (payload) => {
  const data = {
    is_primary: 0,
    country: payload?.country,
    city: payload?.city,
    address: payload?.fulladdress,
    type: payload?.addressType,
    street: payload?.street,
    area: payload?.area,
    block: payload?.block,
    building: payload?.building,
    floor: payload?.floor,
    official_number: payload?.officeNumber,
    latitude: payload?.region?.latitude,
    longitude: payload?.region?.longitude,
    name: payload?.addressNickName,
    home_number: payload?.houseNumber,
    appartment_number: payload?.appartmentNumber,
    office_number: payload?.officeNumber,
    place_id: payload?.place_id,
    country_short_name: payload?.country_short_name,
  };
  const request = await client.post(`${services.user.user_address}`, data);

  return request.data;
};

const createOrder = async (payload, isReOrder = false, endpoint = null) => {
  // alert(isReOrder)
  let images = payload["order_gallery[]"];
  let old_gallery = payload["old_gallery[]"];

  const formData = new FormData();
  images?.length > 0 &&
    images.forEach((el) => {
      formData.append("order_gallery[]", el);
    });

  // old_gallery.forEach((el) => {
  isReOrder && formData.append("old_gallery", JSON.stringify(old_gallery));
  //  });

  const newData = { ...payload };
  delete newData["order_gallery[]"];
  delete newData["old_gallery[]"];
  isReOrder && delete newData["product_image_url"];

  Object.keys(newData).forEach((key) => formData.append(key, newData[key]));
  const request = endpoint ? await client.post(endpoint, formData) : await client.post(isReOrder ? services?.create_order?.re_order_request : services?.create_order.order_request, formData);
  return request?.data;
};

const updateUserProfile = async (payload) => {
  const data = UI_API.getFormData(payload);
  const request = await client.post(services.user.update_profile, data);
  return request?.data;
};
const fetchCreatedOrders = async (page) => {
  const request = await client.get(`${services.my_orders.my_orders}?page=${page}`);
  return request?.data;
};

//post new international or local trip
const createOrFilterTrip = async (payload, isLocalTrip,page) => {
  payload = UI_API.getFormData(payload);
  let url =isLocalTrip ? services.trip.local_trip : services.trip.international_trip;
  const request = await client.post(`${url}?page=${page}`, payload);
  return request?.data;
};

const makeOffer = async (payload) => {
  const request = await client.post(services.create_order.make_offer, payload);
  return request?.data;
};

const widthdrawOffer = async (offer_id) => {
  const request = await client.delete(`${services.create_order.widthdraw_offer}/${offer_id}`);
  return request?.data;
};

const fetchInboxList = async () => {
  //threads
  const request = await messangerClient.get(`${services.messanger.inbox_list}`);
  return request?.data; //TAKE_TO_MOCK.inboxList;
};
const fetchActiveChat = async (thread_id, page_id) => {
  //threads/thread_id/messages
  if(page_id){
    const request = await messangerClient.get(`${services.messanger.open_chat}/${thread_id}/messages/page/${page_id}`);
    return request?.data;
  }
  else{
    const request = await messangerClient.get(`${services.messanger.open_chat}/${thread_id}/messages`);  
    return request?.data;
  }
   //TAKE_TO_MOCK.inboxList;
};

const fetchCurrenciesList = async () => {
  //currencies
  const request = await client.get(`${services.common.currencies}`);
  return request?.data;
};

//get public profile info
const fetchPublicUserInfo = async (user_id) => {
  //currencies
  const request = await client.get(`${services.user.user_profile}/${user_id}`);
  return request?.data;
};

const fetchNotifications = async (page) => {
  //currencies
  const request = await client.get(`${services.user.user_notifications}?page=${page}`);
  return request?.data;
};
//get reorder details
const fetchOrderDetails = async (order_id) => {
  //currencies
  const request = await client.get(`${services.order.order_details}/${order_id}`);
  return request?.data;
};

const tokenRefresh = async (previousToken) => {
  // alert('hwa');
  //   try {
  const data = new FormData();
  data.append("refresh_token", previousToken);
  data.append("grant_type", "refresh_token");
  data.append("client_id", 2);
  data.append("client_secret", "b9vfVBmXV7Te9zJUyw14sL04gGOwgHvTvhA7ycBP");
  const response = await axios.post(`${services.base_url}${services.auth.login}`, data);
  if (response.status !== 400 && response.status !== 401) {
    return response?.data;
  } else {
    return null;
  }
  // } catch (error) {
  //     return null;
  // }
};

const TAKE_2_API = {
  fetchOrderDetails,
  fetchNotifications,
  postDeviceToken,
  tokenRefresh,
  fetchHomeOrdersList,
  fetchRelevantOrdersList,
  fetchPostedOrdersInternationAndLocalList,
  fetchProcessingOrdersList,
  fetchDeliveryOrdersList,
  fetchOfferData,
  fetchCompletedOfferData,
  fetchPublicUserProfile,
  fetchLocalPostedOrderList,
  //filter local orders
  filterPostedLocalOrdersList,
  fetchAllInternationalPostedOrderList,
  fetchInternationalPostedOrderList,
  fetchOrderOffersRequestsList,
  fetchSigleOrderOffersRequestsDetails,
  fetchOrderHistoryList,
  fetchOrderDeliveryHistoryList,
  fetchDisputedOrdersList,
  fetchMyOffersList,
  fetchDeliveryHistoryOrderDetails,
  fetchPopularStoresList,
  fetchOTP,
  fetchWalletHistoryList,
  fetchWalletDeliveryDetails,
  fetchWalletPayoutDetails,
  fetchWalletRefundDetails,
  fetchHeighPaidOrderList,
  //starting live api from here
  fetchUserDetails,
  //post method
  postRegisterData,
  postSigninData,
  //social login
  postSocialData,
  postEmailOtp,
  postMobileOtp,
  verifyOTP,
  //forgot password
  forgotPassword,
  //reset password
  resetPassword,

  //widthdraw
  widthdrawOffer,

  //Countries
  fetchCountriesList,

  //save address
  addNewAdress,

  //create Order
  createOrder,
  //update user profile
  updateUserProfile,

  //My Created Orders
  fetchCreatedOrders,
  //post new local / international trip
  createOrFilterTrip,

  //make offer
  makeOffer,

  //inbox list
  fetchInboxList,
  //active chat
  fetchActiveChat,

  fetchCurrenciesList,
  //public user profile
  fetchPublicUserInfo,

  //paid destination by city
  fetchHeighPaidOrdersListByCity,
};

export default TAKE_2_API;
