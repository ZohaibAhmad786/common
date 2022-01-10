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
  const request = await client.get(`${services.order.posted_orders}?latitude=${latitude}&longitude=${longitude}`);
  // return TAKE_TO_MOCK.posted_orders_list.data;
  return request?.data;
};
const fetchProcessingOrdersList = () => {
  // processing-orders
  return TAKE_TO_MOCK.processing_orders_list;
};
const fetchDeliveryOrdersList = async () => {
  // completed-orders
  const request = await client.get(services.order.completed_orders);
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
  //return TAKE_TO_MOCK.singleCompletedOrderDetails.data;
};

const fetchPublicUserProfile = (user_id) => {
  //user/1
  return TAKE_TO_MOCK.make_single_offer;
};

const fetchLocalPostedOrderList = async (latitude, longitude) => {
  //true ? posted-local-orders
  const request = await client.get(`${services.order.posted_local_orders}?latitude=${latitude}&longitude=${longitude}`);
  // return TAKE_TO_MOCK.posted_orders_list.data;
  return request?.data;

  return TAKE_TO_MOCK.postedLocalOrderList;
};
//filter local orders
const filterPostedLocalOrdersList = async (payload) => {
  //true ? posted-local-orders
  payload = UI_API.getFormData(payload);
  const request = await client.post(`${services.order.posted_local_orders}`, payload);
  return request?.data;

  return TAKE_TO_MOCK.postedLocalOrderList;
};
const fetchInternationalPostedOrderList = async () => {
  //t posted-heigh-paid-international-orders
  const request = await client.get(`${services.order.posted_heigh_paid_international_orders}`);
  // return TAKE_TO_MOCK.postedInternationalOrderList;
  return request?.data;
  // const fetchInternationalPostedOrderList = async () => {
  //   //t posted-heigh-paid-international-orders
  //   const request = await client.get(`${services.order.posted_heigh_paid_international_orders}`);
  //   // return TAKE_TO_MOCK.postedInternationalOrderList;
  //   return request?.data;
};

const fetchAllInternationalPostedOrderList = () => {
  //posted-international-orders-all
  return TAKE_TO_MOCK.displayAllInternationalOrdersList;
};

const fetchOrderOffersRequestsList = (order_id) => {
  // order-offers/76
  return TAKE_TO_MOCK.orderOffersRequestsList.data;
};

const fetchSigleOrderOffersRequestsDetails = (offer_id) => {
  // offer-details/6
  return TAKE_TO_MOCK.offerDetails.data;
};

const fetchOrderHistoryList = async (local = true) => {
  // true ? order-history-local : order-history-international
  const request = local ? await client.get(services.history_order.order_history_local) : await client.get(services.history_order.order_history_international);
  return request?.data;
};

const fetchOrderDeliveryHistoryList = async (local = true) => {
  // true ? delivery-history-local : delivery-history-international
  const request = local ? await client.get(services.deliver_order.delivery_history_local) : await client.get(services.deliver_order.delivery_history_international);
  return request?.data;
};

const fetchDisputedOrdersList = (local = true) => {
  // dispute-orders
  return TAKE_TO_MOCK.disputedOrderList;
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
const postEmailOtp = async (email) => {
  const body = UI_API.getFormData({ email });
  const res = await client.post(`${services.auth.email_otp}`, body);
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
  };
  const request = await client.post(`${services.user.user_address}`, data);

  return request.data;
};

const createOrder = async (payload) => {
  let images = payload["order_gallery[]"];

  console.log(images);
  const formData = new FormData();
  images.forEach((el) => {
    formData.append("order_gallery[]", el);
  });

  const newData = { ...payload };
  delete newData["order_gallery[]"];
  Object.keys(newData).forEach((key) => formData.append(key, newData[key]));
  //return console.log(JSON.stringify(formData))
  const request = await client.post(services?.create_order.order_request, formData);
  return request?.data;
};

const updateUserProfile = async (payload) => {
  const data = UI_API.getFormData(payload);
  const request = await client.post(services.user.update_profile, data);
  return request?.data;
};
const fetchCreatedOrders = async () => {
  const request = await client.get(services.my_orders.my_orders);
  return request?.data;
};

//post new international or local trip
const createOrFilterTrip = async (payload, isLocalTrip) => {
  console.log(payload);
  payload = UI_API.getFormData(payload);
  const request = await client.post(`${isLocalTrip ? services.trip.local_trip : services.trip.international_trip}`, payload);
  // console.log('requestrequest:::',request);
  return request?.data;
};

const makeOffer = async (payload) => {
  const request = await client.post(services.create_order.make_offer, payload);
  // console.log('requestrequest:::',request);
  return request?.data;
};

const TAKE_2_API = {
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
  fetchDeliveryHistoryOrderDetails,
  fetchPopularStoresList,
  fetchOTP,
  fetchWalletHistoryList,
  fetchWalletDeliveryDetails,
  fetchWalletPayoutDetails,
  fetchWalletRefundDetails,
  //starting live api from here
  fetchUserDetails,
  //post method
  postRegisterData,
  postSigninData,
  postEmailOtp,

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
};

export default TAKE_2_API;
