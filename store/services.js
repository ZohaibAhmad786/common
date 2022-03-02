import moment from "moment";
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Linking,
} from "react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import GetLocation from "react-native-get-location";
import ImageCropPicker from "react-native-image-crop-picker";
import services from "../api/services";
import TAKE_TO_CONSTANT from "../utils/utils";
import GPSState from "react-native-gps-state";
const enableLocationPop = () =>
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then((data) => {
      // The user has accepted to enable the location services
      // data can be :
      //  - "already-enabled" if the location services has been already enabled
      //  - "enabled" if user has clicked on OK button in the popup
      return true;
    })
    .catch((err) => {
      // throw new Error(err);
      console.log("location denied");
      // The user has not accepted to enable the location services or something went wrong during the process
      // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
      // codes :
      //  - ERR00 : The user has clicked on Cancel button in the popup
      //  - ERR01 : If the Settings change are unavailable
      //  - ERR02 : If the popup has failed to open
      //  - ERR03 : Internal error
    });
const getPermission = async (alertRef = null, Linking) => {
  try {
    if (Platform.OS === "ios") {
      const hasPermission = await hasPermissionIOS(alertRef, Linking);
      return hasPermission;
    }
    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show("Permission denied", ToastAndroid.LONG);
      return false;
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show("Permission disabled", ToastAndroid.LONG);
      return "disabled";
      // if (Platform.OS !== 'android')
      //   Linking.openURL('app-settings:')
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
const hasPermissionIOS = async (alertRef, Linking) => {
  const status = await Geolocation.requestAuthorization("whenInUse");

  if (status === "granted") {
    return true;
  }

  if (status === "denied") {
    // Alert.alert("Permission denied");
    alertRef.current.alertWithType("error", "Error", "Permission Denied");
    // Linking.openURL("app-settings:");
    return "disabled";
  }

  if (status === "disabled") {
    return "disabled";
    // Alert.alert("Permission disabled");
    // Linking.openURL("app-settings:");
  }

  return false;
};
const UI_API = {
  bytesToSize: (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(
      Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)),
      10
    );
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  },
  _returnImage: async (getData, setData, alertRef) => {
    try {
      if (getData.didCancel) {
        throw new Error("Oops! It seems you have cancel the action.");
      } else if (getData.errorCode === "camera_unavailable") {
        throw new Error("Oops! It seems camera is not available");
      } else if (getData.errorCode === "others") {
        throw new Error("Oops! It something went wrong.");
      } else if (getData.errorCode === "permission") {
        throw new Error(
          `Oops! It seems you have'nt allow the camera permission`
        );
      } else if (getData.errorMessage) {
        throw new Error(getData.errorMessage);
      } else {
        setData({
          profile_image: {
            uri:
              Platform.OS === "android"
                ? getData.assets[0].uri
                : getData.assets[0].uri.replace("file://", ""),
            name: getData.assets[0].fileName,
            type: getData.assets[0].type,
          },
        });
      }
    } catch (error) {
      alertRef.current.alertWithType(
        "error",
        "Error",
        UI_API._returnError(error)
      );
    }
  },
  _openCamera: async (setData, alertRef) => {
    try {
      const response = await ImageCropPicker.openCamera({
        mediaType: "photo",
        cropping: true,
        width: 300,
        height: 400,
        // forceJpg: Platform.OS === "ios",
        //waitAnimationEnd: false,
      });
      // const size = UI_API.bytesToSize(response?.size) || "";
      // if (size.split(" ")[0] * 1 < 3 && size.includes("MB")) throw new Error("Oops! It seems your image size is greater than 2 MB.");
      const ext = response?.path?.split("/");
      const fileName = ext[ext.length - 1];
      setData({
        profile_image: {
          uri:
            Platform.OS === "android"
              ? response?.path
              : response?.path.replace("file://", ""),
          name: fileName,
          type: response?.mime,
        },
      });
    } catch (error) {
      alertRef.current.alertWithType(
        "error",
        "Error",
        UI_API._returnError(error)
      );
    }
  },
  _openGallery: async (setData, alertRef) => {
    try {
      const response = await ImageCropPicker.openPicker({
        mediaType: "photo",
        cropping: true,
        width: 300,
        height: 400,
        // forceJpg: Platform.OS === "ios",
        waitAnimationEnd: false,
      });

      // const size = UI_API.bytesToSize(response?.size) || "";
      // if (size.split(" ")[0] * 1 < 3 && size.includes("MB")) throw new Error("Oops! It seems your image size is greater than 2 MB.");
      const ext = response?.path?.split("/");
      const fileName = ext[ext.length - 1];
      setData({
        profile_image: {
          uri:
            Platform.OS === "android"
              ? response?.path
              : response?.path.replace("file://", ""),
          name: fileName,
          type: response?.mime,
        },
      });
    } catch (error) {
      alertRef.current.alertWithType(
        "error",
        "Error",
        UI_API._returnError(error)
      );
    }
  },
  getFormData: (object) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  },
  _returnError: (error) => {
    console.log(error);
    if (error?.response?.request) {
      let { _response } = error?.response?.request;
      console.log("FACTORY ERRORS :: ", JSON.parse(_response));
      return JSON.parse(_response) === "Insufficient balance in wallet."
        ? JSON.parse(_response)
        : JSON.parse(_response)?.error === "invalid_grant"
        ? JSON.parse(_response)?.message
        : // : Object.keys(JSON.parse(_response)?.errors).length > 0
        // ? TAKE_TO_CONSTANT.returnErrorList(JSON.parse(_response))
        JSON.parse(_response)?.message &&
          JSON.parse(_response)?.errors === undefined //Object.keys(JSON.parse(_response)?.errors).length <= 0 && Object.keys(JSON.parse(_response)?.errors) === undefined
        ? JSON.parse(_response)?.message
        : JSON.parse(_response)?.message &&
          JSON.parse(_response)?.errors.length <= 0
        ? JSON.parse(_response)?.message //"Oops! it seems your signin session expired."
        : TAKE_TO_CONSTANT.returnErrorList(JSON.parse(_response));
      // : error.message?.toString();
      // return JSON.parse(_response) === "Insufficient balance in wallet."
      //   ? JSON.parse(_response)
      //   : JSON.parse(_response)?.error === "invalid_grant"
      //   ? JSON.parse(_response)?.message
      //   : Object.keys(JSON.parse(_response)?.errors).length > 0
      //   ? TAKE_TO_CONSTANT.returnErrorList(JSON.parse(_response))
      //   : JSON.parse(_response)?.message
      //   ? JSON.parse(_response)?.message.toString()
      //   : error.message?.toString();
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
  //ask user to go to setting to permit location service
  locationSettingAlert: () => {
    Alert.alert(
      "Location",
      "Do you want to change Location Permission from mobile Settings",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            Platform.OS === "android"
              ? GPSState.openAppDetails()
              : Linking.openURL("app-settings:"),
        },
      ]
    );
  },
  _get_current_location: async (showEnabler = true) => {
    try {
      if (Platform.OS === "android" && showEnabler) {
        await enableLocationPop();
      }
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      return {
        latitude: location?.latitude,
        latitudeDelta: 0.015,
        longitude: location?.longitude,
        longitudeDelta: 0.0121,
      };
    } catch (error) {
      //  throw new Error(error);
      // enableLocationPop();
      return false;
    }
  },

  _getLocPermissionStatus: async (Linking, alertRef) => {
    // getPermission(alertRef, Linking)
    const status = await GPSState.getStatus();
    console.log("status:", status);
    switch (status) {
      case 0:
        console.log(
          "The user has not yet made a choice regarding whether this app can use location services."
        );
        //  return  UI_API._requestLocationPermission(Linking, alertRef).then(bool => bool);
        return getPermission(alertRef, Linking);
      case 1:
        console.log("	This app is not authorized to use location services.");
        return getPermission(alertRef, Linking);
      case 2:
        console.log("Explicity denied DENIED");
        // const bool = await UI_API._requestLocationPermission(Linking, alertRef);

        return getPermission(alertRef, Linking);
      // return false;
      case 3:
        console.log("This app is authorized to use location services.");
        return true;
      case 4:
        console.log("AUTHORIZED_WHENINUSE in IOS");
        return true;
      default:
        return false;
    }
  },
  _enableLocation: () => enableLocationPop(),
  _returnAddress: (addressObject) => {
    //  console.log("addressObject::", JSON.stringify(addressObject))
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
        } else if (
          item.types.some((el) => el === "administrative_area_level_2")
        ) {
          returnAddress = { ...returnAddress, district: item.long_name };
        } else if (
          item.types.some((el) => el === "administrative_area_level_3")
        ) {
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
          returnAddress = {
            ...returnAddress,
            country: item.long_name || null,
            country_short_name: item?.short_name,
          };
        }
      });
    });
    console.log(returnAddress);
    return returnAddress;
  },
  _requestLocationPermission: (alertRef = null, Linking) =>
    getPermission(alertRef, Linking),
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
      time: item?.order_created_at||item?.readable_created_at,
      title: item?.order_title,
      order_site: item?.order_site,
      price: item?.order_price,
      store_img: item?.order_image,
      reward: item?.order_reward_price,
      user_name: item?.order_by?.user_name,
      user_img: item?.order_by?.user_image,
      user_id: item?.order_by?.user_id,
      user_name_tr: item?.traveler?.user_name,
      user_img_tr: item?.traveler?.user_image,
      user_id_tr: item?.traveler?.user_id,
      order_from: item?.order_from,
      order_to: item?.order_to,
      order_to_flag: item?.order_to_flag,
      order_from_flag: item?.order_from_flag,
    };
  },
  _removeEmptyKeys: (payload) => {
    const obj = payload;
    Object.keys(obj).forEach((key) => {
      if (obj[key] === "") {
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
    } else if (diff === 0) {
      return text + ` ${24} hours`;
    } else if (diff > 2) {
      return `Deliver before ${moment(date).format("DD MMMM, YYYY")}`;
    } else {
      return text + ` ${diff + 1} days`;
    }
  },
  _returnFlag: (short_name) =>
    `${services.base_flag_url}${short_name?.toLowerCase()}.png`,

  _toDataUrlToBase64: (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  },
  _returnPage: (obj = {}) => {
    const isAlreadyHasOrders = Object.keys(obj)?.length > 0 ? true : false;

    let current_page = 1;
    if (isAlreadyHasOrders) {
      let pagination = obj?.meta?.pagination;

      current_page = pagination?.current_page;

      let total_pages = pagination?.total_pages;
      console.log("current_page :: ", current_page);
      console.log("total_pages :: ", total_pages);
      if (current_page < total_pages) {
        return ++current_page;
      } else {
        return 0;
      }
    }
    return current_page;
  },
  _checkPermissions: async (a, l) => getPermission(a, l),
  _reOrderHandler :(order_data={},countriesList=[],callBack) => {
    let re_order_object = {
      isReOrder: true,
      name: order_data?.order_title,
      order_gallery: order_data?.order_gallery?.map(el => ({
        uri: el,
        old_gallery: true,
      })),
      quantity: order_data?.order_quantity,
      price: order_data?.raw_order_price?.toString(),
      reward: order_data?.order_reward_price?.toString(),
      detail: order_data?.order_detail,
      instructions: order_data?.order_instructions || '',
      shop_latitude: order_data?.shop_location?.latitude || '',
      shop_longitude: order_data?.shop_location?.longitude || '',
      delivery_before_date: order_data?.delivery_before_date,
      with_box: order_data?.order_packaging || false,
      is_private: order_data?.is_private || false,
      is_urgent: order_data?.is_urgent || false,
      order_site: order_data?.order_site || '',
      shop_name: order_data?.order_shop_name || '',
      shop_block: order_data?.shop_block || '',
      shop_street: order_data?.shop_street || '',
      shop_country: order_data?.shop_country || '',
      shop_city: order_data?.shop_city || '',
      product_link: order_data?.order_store_url || '',
      product_image_url: order_data?.order_image || '',
      country_short_name: order_data?.order_from_country_shortcode || '',
      country_flag:
        (countriesList?.some(el => el.name === order_data?.shop_country) &&
          countriesList?.find(el => el.name === order_data?.shop_country)
            ?.flag) ||
        '',
    };
    console.log('re_order_object::', re_order_object);

    callBack(
      order_data?.order_site
        ? 'createorderestore'
        : 'createorderpstore',
      { re_order_object: re_order_object },
    );
  }
};

export default UI_API;
