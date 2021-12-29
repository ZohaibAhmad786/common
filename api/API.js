import TAKE_TO_MOCK from "../utils/mock";
import axios from 'axios';
import services from "./services";
import TAKE_TO_CONSTANT from "../utils/utils";
import UI_API from "../store/services";

// GET METHODS

const fetchHomeOrdersList = () => {
  // home-orders
  return TAKE_TO_MOCK.home_orders_list?.data;
};

const fetchRelevantOrdersList = () => {
  // relevant-orders
  return TAKE_TO_MOCK.relevant_orders_list;
};
const fetchPostedOrdersInternationAndLocalList = () => {
  // posted-orders
  return TAKE_TO_MOCK.posted_orders_list.data;
};
const fetchProcessingOrdersList = () => {
  // processing-orders
  return TAKE_TO_MOCK.processing_orders_list;
};
const fetchDeliveryOrdersList = () => {
  // completed-orders
  return TAKE_TO_MOCK.delivery_orders_list;
};

const fetchOfferData = (order_id) => {
  // order-details-for-offer/1
  return TAKE_TO_MOCK.make_single_offer.data;
};

const fetchCompletedOfferData = (order_id) => {
  //  order-details/4
  return TAKE_TO_MOCK.singleCompletedOrderDetails.data;
};

const fetchPublicUserProfile = (user_id) => {
  //user/1
  return TAKE_TO_MOCK.make_single_offer;
};

const fetchLocalPostedOrderList = () => {
  //true ? posted-local-orders 
  return TAKE_TO_MOCK.postedLocalOrderList
};
const fetchInternationalPostedOrderList = () => {
  //t posted-international-orders
  return TAKE_TO_MOCK.postedInternationalOrderList;
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

const fetchOrderHistoryList = (local = true) => {
  // true ? order-history-local : order-history-international
  //   TAKE_TO_MOCK.localHistoryOrder
  return local ? (local ? TAKE_TO_MOCK.localHistoryOrder : TAKE_TO_MOCK.internationalHistoryOrder) : TAKE_TO_MOCK.internationalHistoryOrder;
};

const fetchOrderDeliveryHistoryList = (local = true) => {
  // true ? delivery-history-local : delivery-history-international
  return local ? (local ? TAKE_TO_MOCK.localOrderDeliveryHistory : TAKE_TO_MOCK.internationalOrderDeliveryHistory) : TAKE_TO_MOCK.internationalOrderDeliveryHistory;
};

const fetchDisputedOrdersList = (local = true) => {
  // dispute-orders
  return TAKE_TO_MOCK.disputedOrderList;
};

const fetchDeliveryHistoryOrderDetails = (order_id) => {
  // deliverer-order-details/9
  return TAKE_TO_MOCK.signleDeliveryHistoryOrderDetails.data;
};

const fetchPopularStoresList = () => {
  // popular-stores
  return TAKE_TO_MOCK.popularStoresList;
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
    client_id:2,
    client_secret:'b9vfVBmXV7Te9zJUyw14sL04gGOwgHvTvhA7ycBP',
    grant_type:'password',
  });

  console.log('body: ',body);
  const res = await axios.post(`${services.base_url}${services.auth.login}`, body);
  // wallet-refund-details
  return res;
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
  //post method
  postRegisterData,
  postSigninData,
};

export default TAKE_2_API;
