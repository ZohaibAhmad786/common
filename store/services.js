import moment from "moment";
import { Alert, PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import GetLocation from "react-native-get-location";
import TAKE_TO_CONSTANT from "../utils/utils";

const hasPermissionIOS = async () => {
  const status = await Geolocation.requestAuthorization("whenInUse");

  if (status === "granted") {
    return true;
  }

  if (status === "denied") {
    Alert.alert("Permission denied");
  }

  if (status === "disabled") {
    Alert.alert("Permission disabled");
  }

  return false;
};
const UI_API = {
  getFormData: (object) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  },
  _returnError: (error) => {
    console.log(error);
    if (error?.response?.request) {
      let { _response } = error?.response?.request;
      // return _response?.message
      console.log("JSON.parse(_response):", JSON.parse(_response));
      // console.log("Object.keys(JSON.parse(_response)?.errors) :: ",Object.keys(JSON.parse(_response))?.errors)

      return Object.keys(JSON.parse(_response))?.errors !== undefined && Object.keys(JSON.parse(_response)?.errors).length > 0
        ? TAKE_TO_CONSTANT.returnErrorList(JSON.parse(_response))
        : JSON.parse(_response)?.message
        ? JSON.parse(_response)?.message.toString()
        : error.message?.toString();
    } else {
      if (error === "Hi Dude") {
        return "Dismiss";
      } else if (error?.message) {
        if (error?.message === "Network Error") {
          return "Network Error";
        } else {
          if (error === "Hi Dude") {
            return "Dismiss";
          } else if (error?.message) {
            if (error?.message === "Network Error") {
              return "Network Error";
            } else {
              return error.message?.toString();
            }
          } else {
            return error?.toString();
          }
        }
      }
    }
  },

  _returnStringify: (data) => JSON.stringify(data),
  _get_current_location: async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 3000,
      });
      return {
        latitude: location?.latitude,
        latitudeDelta: 0.015,
        longitude: location?.longitude,
        longitudeDelta: 0.0121,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  _returnAddress: (addressObject) => {
    let returnAddress = {
      street_number: null,
      street_address: null,
      fulladdress: addressObject.results[0].formatted_address,
      geoCode: {
        ...addressObject.results[0]?.geometry?.location,
      },
      place_id: addressObject.results[0]?.place_id,
    };
    addressObject.results?.forEach((element) => {
      element?.address_components?.forEach((item) => {
        if (item.types.some((el) => el === "administrative_area_level_1")) {
          returnAddress = { ...returnAddress, province: item.long_name };
        } else if (item.types.some((el) => el === "administrative_area_level_2")) {
          returnAddress = { ...returnAddress, district: item.long_name };
        } else if (item.types.some((el) => el === "administrative_area_level_3")) {
          returnAddress = { ...returnAddress, tehsil: item.long_name };
        } else if (item.types.some((el) => el === "locality")) {
          returnAddress = { ...returnAddress, city: item.long_name };
        } else if (item.types.some((el) => el === "sublocality")) {
          returnAddress = { ...returnAddress, area: item.long_name };
        } else if (item.types.some((el) => el === "street_address")) {
          returnAddress = {
            ...returnAddress,
            street_address: item.long_name || null,
          };
        } else if (item.types.some((el) => el === "street_number")) {
          returnAddress = {
            ...returnAddress,
            street_number: item.long_name || null,
          };
        } else if (item.types.some((el) => el === "country")) {
          returnAddress = { ...returnAddress, country: item.long_name || null, country_short_name: item?.short_name };
        }
      });
    });
    return returnAddress;
  },
  _requestLocationPermission: async () => {
    try {
      if (Platform.OS === "ios") {
        const hasPermission = await hasPermissionIOS();
        return hasPermission;
      }
      if (Platform.OS === "android" && Platform.Version < 23) {
        return true;
      }

      const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show("Permission denied", ToastAndroid.LONG);
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show("Permission disabled", ToastAndroid.LONG);
      }
      return false;
    } catch (err) {
      console.warn(err);
      return false;
    }
  },
  serialize: (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },
  _returnOrderProps: (item) => {
    return {
      urgent_delivery: item?.is_urgent,
      local: !item?.is_international,
      shopName: item?.order_shop_name,
      time: item?.order_created_at,
      title: item?.order_title,
      website: item?.order_store_url || item?.order_site,
      price: item?.order_price,
      store_img: item?.order_image,
      reward: item?.order_reward_price,
      user_name: item?.order_by?.user_name,
      user_img: item?.order_by?.user_image,
      order_from: item?.order_from,
      order_to: item?.order_to,
      order_to_flag: item?.order_to_flag,
      order_from_flag: item?.order_from_flag,
    };
  },
  _removeEmptyKeys: (payload) => {
    const obj = payload;
    Object.keys(obj).forEach((key) => {
      if (!obj[key]) {
        delete obj[key];
      }
    });
    return obj;
  },
  _replaceAllSlash: (str) =>
    str
      .split("/")
      .map((e) => e.trim())
      .reverse()
      .join("-"),

  _returnNewCountryList: (oldList, index) => {
    const list = oldList.map((el) => ({ ...el, isActive: false }));
    list[index].isActive = true;
    return list;
  },
  _returnGeoCodeData: async (region) => {
    try {
      const response = await Geocoder.from(region.latitude, region.longitude);
      return UI_API._returnAddress(response);
    } catch (error) {
      throw new Error(UI_API._returnError(error));
    }
  },

  _returnFlag: (list, country) => {
    const flag = list.find((el) => el.name === country)?.flag;
    return flag;
  },
  _returnUrgencyTitle: (date) => {
    let text = `Within`;
    const diff = moment(date).diff(moment(), "days");
    if (diff < 0) {
      return text + ` ${24} hours`;
    } 
    else if (diff === 0) {
      return text + ` ${24} hours`;
    } else {
      return text + ` ${diff} days`;
    }
  },
};

export default UI_API;
