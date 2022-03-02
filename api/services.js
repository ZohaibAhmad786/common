export default {
  base_url: "https://api.taketo.exodevs.com/v1/",
  base_flag_url:"https://api.taketo.exodevs.com/flags/128x128/",
  land_mark: "https://api.taketo.exodevs.com/admin-theem/dist/img/no-image-icon-6.png",
  chat_base_url:"https://api.taketo.exodevs.com/api/messenger/",

  
  auth: {
    register: "register",
    login: "oauth/token",
    social:'auth',
    email_otp: "send-email-otp",
    forgot:'password/forgot',
    reset:'password/reset',
    mobile_otp: "send-mobile-otp",
    language: "languages",
    verify_otp:'verify-otp',
    logout:'logout',
    device_token:'device-token',
  },
  user: {
    user_profile: "user-profile", //private
    user_public_profile: "user-profile/", //user-profile/1,
    user_address: "user-address",
    update_profile: "update-profile",
    user_notifications:'user-notifications'
  },
  common: {
    countires: "countries?limit=0",
    storeList: "popular-stores",
    currencies:'currencies' 
  },
  create_order: {
    order_request: "order-request",
    re_order_request: "re-order",
    make_offer: "make-offer",
    my_offers: "my-offers",
    accept_offer:'accept-offer',
    reject_offer:'reject-offer',
    widthdraw_offer: 'withdraw-offer',
    cancel_order: "cancel-order",
    update_order_status:'update-order-status',
    update_offer : 'update-offer'
  },
  order: {
    home_order: "home-orders",
    relevant_orders: "relevant-orders",
    posted_orders: "posted-orders",
    processing_orders: "processing-orders",
    completed_orders: "delivered-orders",
    order_details_for_offer: "order-details-for-offer",
    order_details: "order-details",
    posted_local_orders: "posted-local-orders",
    posted_international_orders: "posted-international-orders",
    posted_international_orders_all: "posted-international-orders-all",
    order_offers: "order-offers",
    offer_details: "offer-details",
    order_details: "order-details",
    posted_heigh_paid_international_orders: "posted-heigh-paid-international-orders",
    heigh_paid_destinations: "heigh-paid-destinations",
  },
  history_order: {
    order_history_local: "order-history-local",
    order_history_international: "order-history-international",
  },
  deliver_order: {
    delivery_history_local: "delivery-history-local",
    delivery_history_international: "delivery-history-international",
    deliverer_order_details: "deliverer-order-details",
  },
  my_orders: {
    my_orders: "my-orders",
  },
  dipusted_order: {
    dispute_orders: "disputes",
  },
  wallet: {
    wallet_history: "wallet-history",
    wallet_delivery_details: "wallet-delivery-details",
    wallet_payout_details: "wallet-payout-details",
    wallet_refund_details: "wallet-refund-details",
  },
  trip: {
    international_trip: "international-trip",
    local_trip: "local-trip",
  },
  messanger:{
    create_thread:'create-thread',//ya end point hum new chat ka session create krny k liya use krty hain
    inbox_list:'threads',// inbox k list hai non messanger client
    open_chat:'threads',
  }
};
