import moment from "moment";

//calander start here
const getMonth = (year = 2021, month = 11) => {
  let startDate = moment([year, month - 1]);
  let endDate = moment(startDate).endOf("month");

  var dates = [];
  var weeks = [];

  var per_week = [];
  var difference = endDate.diff(startDate, "days");

  per_week.push(startDate.toDate());
  let index = 0;
  let last_week = false;
  while (startDate.add(1, "days").diff(endDate) < 0) {
    if (startDate.day() != 0) {
      per_week.push(startDate.toDate());
    } else {
      if (startDate.clone().add(7, "days").month() == month - 1) {
        weeks.push(per_week);
        per_week = [];
        per_week.push(startDate.toDate());
      } else if (Math.abs(index - difference) > 0) {
        if (!last_week) {
          weeks.push(per_week);
          per_week = [];
        }
        last_week = true;
        per_week.push(startDate.toDate());
      }
    }
    index += 1;
    if ((last_week == true && Math.abs(index - difference) == 0) || (Math.abs(index - difference) == 0 && per_week.length == 1)) {
      weeks.push(per_week);
    }
    dates.push(startDate.clone().toDate());
  }
  const fullMonths = [];
  weeks.map((week) => {
    week?.map((day) => {
      fullMonths.push(day);
    });
  });
  return fullMonths;
};

const convertUpperCase = (label = "") => {
  return label.toLocaleUpperCase();
};
const convertCapitalizeFirst = (str = "") => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const getConversationDate = (time) => {
  let date = moment(time).calendar();
  if (date.includes("Today")) {
    return date.split(" at ")[1];
  } else {
    return date.split(" at ")[0];
  }
};
const getConversationTime = (time) => moment(time).format("hh:mm A");

const getFromNow = (date) => {
  return moment(date).fromNow();
};

const getDate = (date, format = "DD MMMM YYYY") => {
  return moment(date).format(format);
};

const restElementAfterSplitting = (string) => {
  const [, ...rest] = string?.split(" ");
  return rest.join(" ");
};

const returnObjectKeys = (object) => {
  return Object.keys(object);
};

const _returnTaxSum = (list = []) => {
  let sum = 0;
  list.forEach((element) => {
    sum += element.tax_amount * 1;
  });
  return sum;
};

// Validations start here
//phone number regex
const validatePhoneNumber = (phoneNumber) => {
  var patt = new RegExp(/^\+(965|966|968|971|973|974)[569][0-9]{7}$/);
  return patt.test(phoneNumber);
};
//email regex
export const validateEmail = (mail) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
};
//float number validation
const floatValidation = (number) => {
  var patt = new RegExp(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/);
  return patt.test(number);
};
//int number validation
const intValidation = (number) => {
  var patt = new RegExp(/^[0-9]+$/);
  return patt.test(number);
};
// to count occurence
const getOccurrence = (str, substr) => {
  return str.match(/o/g) || [];
};
//to match password
const isPasswordsMatched = (password, cpassword) => password == cpassword;
//possible messages to be displayed
const getEmptyFieldMessage = (fieldName) => ({ message: `Oops! you have forgot to enter ${fieldName}`, status: false });
const getLessThenZeroMessage = (fieldName) => ({ message: `Oops! your ${fieldName} must be grater then 1`, status: false });
const getInvalidFieldMessage = (fieldName) => ({ message: `Oops! you have entered invalid ${fieldName}`, status: false });
const getPasswordMessage = (fieldName) => ({ message: `Oops! your ${fieldName} length must be greater or equal to 8 characters`, status: false });
const getNotMatched = () => ({ message: `Oops! Password and confirm password did not match`, status: false });
const getOkMessage = () => ({ message: `OK`, status: true });
//signin fields validation
const signinValidation = (fields = {}) => {
  if (!fields?.email?.trim()) {
    return getEmptyFieldMessage("email");
  } else if (!validateEmail(fields?.email)) {
    return getInvalidFieldMessage("email");
  } else if (!fields?.password?.trim()) {
    return getEmptyFieldMessage("password");
  }
  //  else if (fields?.password?.trim()?.length < 8) {
  //   return getPasswordMessage("password");
  // }
  return getOkMessage();
};
const resetPasswordValidation = (fields = {}) => {
  if (!fields?.password?.trim()) {
    return getEmptyFieldMessage("password");
  } else
    if (fields?.password?.trim()?.length < 8) {
      return getPasswordMessage("password");
    } else if (!fields?.confirm_password?.trim()) {
      return getEmptyFieldMessage("confirm password");
    } else if (!isPasswordsMatched(fields.password, fields.confirm_password)) {
      return getNotMatched();
    }
  //  else if (fields?.password?.trim()?.length < 8) {
  //   return getPasswordMessage("password");
  // }
  return getOkMessage();
};
//reset field validation
const resetValidation = (fields = {}) => {

  if (!fields?.email?.trim()) {
    return getEmptyFieldMessage("email");
  } else if (!validateEmail(fields?.email)) {
    return getInvalidFieldMessage("email");
  }
  return getOkMessage();
};

//submitRequestValidation validation
const submitRequestValidation = (fields = {}) => {
<<<<<<< HEAD

=======
  console.log("fields: ", fields);
>>>>>>> a974081d9fa8f10fe552e40770d5c83612c59cad
  if (!fields?.title?.trim()) {
    return getEmptyFieldMessage("title");
  } else if (!fields?.message.trim()) {
    return getEmptyFieldMessage("message");
  }
  return getOkMessage();
};
//submitReview validation
const submitReviewValidation = (fields = {}) => {
<<<<<<< HEAD

=======
  console.log("fields: ", fields);
>>>>>>> a974081d9fa8f10fe552e40770d5c83612c59cad
  if (!fields?.communicationStar && !fields?.ServiceStar && !fields?.PunctualityStar) {
    return ({
      status: false,
      message: 'Oops! It seems that you have forgot to rate user'
    })
  }
  return getOkMessage();
};
//sign up validation
const signupValidation = (fields = {}) => {
  if (!fields?.name?.trim()) {
    return getEmptyFieldMessage("first & last name");
  } else if (!fields?.user_name?.trim()) {
  
    return getEmptyFieldMessage("username");
  } else if (!fields?.email?.trim()) {
  
    return getEmptyFieldMessage("email");
  } else if (!validateEmail(fields?.email)) {
    return getInvalidFieldMessage("email");
  } else if (!fields?.password?.trim()) {
    return getEmptyFieldMessage("password");
  } else if (fields?.password?.trim()?.length < 8) {
    return getPasswordMessage("password");
  } else if (!fields?.confirm_password?.trim()) {
    return getEmptyFieldMessage("confirm password");
  } else if (fields?.confirm_password?.trim()?.length < 8) {
    return getPasswordMessage("confirm password");
  } else if (!isPasswordsMatched(fields.password, fields.confirm_password)) {
    return getNotMatched();
  }
  return getOkMessage();
};
//account info validation
const accountInfoValidation = (fields = {}) => {
  if (!fields?.name?.trim()) {
    return getEmptyFieldMessage("first & last name");
  } else if (!fields?.user_name?.trim()) {
    return getEmptyFieldMessage("username");
  }
  return getOkMessage();
};
//new address validation
const newAddressValidation = (fields = {}) => {
  // if (!fields?.addressNickName?.trim()) {
  //   return getEmptyFieldMessage("address name");
  // } else
  if (!fields?.area?.trim()) {
    return getEmptyFieldMessage("area");
  }
  // } else if (!fields?.street?.trim()) {
  //   return getEmptyFieldMessage("street");
  // } else if (!fields?.addressType?.trim()) {
  //   return getEmptyFieldMessage("address type");
  // } else if (!fields?.building?.trim()) {
  //   return getEmptyFieldMessage("building");
  // } else if (!fields?.floor?.trim()) {
  //   return getEmptyFieldMessage("floor");
  // } else if (!fields?.officeNumber?.trim()) {
  //   return getEmptyFieldMessage("office number");
  // }
  return getOkMessage();
};

const physicalShopValidation = (fields = {}) => {
  //const conditions = [",", "/", "+","-","#"]
  if (fields?.images?.length < 2) {
    return getEmptyFieldMessage("product images");
  } else if (!fields?.productName?.trim()) {
    return getEmptyFieldMessage("product name");
  } else if (!fields?.productPrice?.trim()) {
    return getEmptyFieldMessage("product price");
    // } else if (conditions.some(el => (fields?.productPrice).includes(el))) {
    //   return getInvalidFieldMessage("product price");
    // } else if (fields?.productPrice?.trim().charAt(fields?.productPrice?.length - 1) == ".") {
    //   return getInvalidFieldMessage("product price");
    // } else if ((fields?.productPrice?.split('.').length - 1) > 1) {
    //   return getInvalidFieldMessage("product price");
  } else if (parseFloat(fields?.productPrice) < 1) {
    return getLessThenZeroMessage("product price");
  } else if (!fields?.productDetails?.trim()) {
    return getEmptyFieldMessage("product detail");
  } else if (!fields?.shopName?.trim()) {
    return getEmptyFieldMessage("shop name");
  } else if (!fields?.shopAddress) {
    return getEmptyFieldMessage("shop address");
  }
  // else if (!fields?.instractions?.trim()) {
  //   return getEmptyFieldMessage("instractions");
  // }
  return getOkMessage();
};

const eShopValidation = (fields = {}) => {
  if (!fields?.url?.trim()) {
    return getEmptyFieldMessage("product url");
  } else if (fields?.images?.length < 2) {
    return getEmptyFieldMessage("product images");
  } else if (!fields?.productName?.trim()) {
    return getEmptyFieldMessage("product name");
  } else if (!fields?.productPrice?.trim()) {
    return getEmptyFieldMessage("product price");
    // } else if (fields?.productPrice?.trim().charAt(fields?.productPrice?.length - 1) == ".") {
    //   return getInvalidFieldMessage("product price");
    // } else if (fields?.productPrice?.trim().includes(',')) {
    //   return getInvalidFieldMessage("product price");
    // } else if ((fields?.productPrice?.split('.').length - 1) > 1) {
    //   return getInvalidFieldMessage("product price");
  } else if (parseFloat(fields?.productPrice) < 1) {
    return getLessThenZeroMessage("product price");
  } else if (!fields?.productDetails?.trim()) {
    return getEmptyFieldMessage("product detail");
  } else if (!fields?.country?.trim()) {
    return getEmptyFieldMessage("buy from");
  }
  // else if (!fields?.instractions) {
  //   return getEmptyFieldMessage("instractions");
  // }
  return getOkMessage();
};

const deliveryDetailsValidation = (fields = {}) => {
  if (!fields?.deliveryLocation) {
    return getEmptyFieldMessage("delivery address");
  } else if (!fields?.reward?.trim()) {
    return getEmptyFieldMessage("reward price");
    // } else if (fields?.reward?.trim().charAt(fields?.reward?.length - 1) == ".") {
    //   return getInvalidFieldMessage("product price");
    // } else if (fields?.reward?.trim().includes(',')) {
    //   return getInvalidFieldMessage("reward price");
    // } else if ((fields?.reward?.split('.').length - 1) > 1) {
    //   return getInvalidFieldMessage("reward price");
  } else if (parseFloat(fields?.reward) < 1) {
    return getLessThenZeroMessage("reward price");
  } else if (!fields?.isUrgent && !fields?.date) {
    return getEmptyFieldMessage("delivery date");
  }
  return getOkMessage();
};

const offerPriceValidation = (fields = {}) => {
  if (!fields?.offerPrice?.trim()) {
    return getEmptyFieldMessage("offer price");
    // } else if (fields?.offerPrice?.trim().includes(',')) {
    //   return getInvalidFieldMessage("offer price");
    // } else if (fields?.offerPrice?.trim().charAt(fields?.offerPrice?.length - 1) == ".") {
    //   return getInvalidFieldMessage("product price");
    // } else if ((fields?.offerPrice?.split('.').length - 1) > 1) {
    //   return getInvalidFieldMessage("offer price");
  } else if (parseFloat(fields?.offerPrice) < 1) {
    return getLessThenZeroMessage("offer price");
  }
  return getOkMessage();
};

const shopAddressValidation = (fields = {}) => {
  if (!fields?.street_number?.trim()) {
    return getEmptyFieldMessage("street/road");
  } else if (!fields?.area?.trim()) {
    return getEmptyFieldMessage("area/block");
  } else if (!fields?.city?.trim()) {
    return getEmptyFieldMessage("city");
  } else if (!fields?.country?.trim()) {
    return getEmptyFieldMessage("country");
  }
  return getOkMessage();
};

const returnErrorList = (data) => {
  let text = "";

  Object.values(data.errors).forEach((el) => {
    text += `${el}\n`;
  });
  return text.trim();
};


const _returnHeaderTitle = (str) => {
  //split the above string into an array of strings 
  //whenever a blank space is encountered

  const arr = str.split(" ");

  //loop through each element of the array and capitalize the first letter.


  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }

  //Join all the elements of the array back into a string 
  //using a blankspace as a separator 
  const str2 = arr.join(" ");
  return str2
}

const TAKE_TO_CONSTANT = {
  submitReviewValidation,
  resetPasswordValidation,
  shopAddressValidation,
  deliveryDetailsValidation,
  physicalShopValidation,
  eShopValidation,
  getMonth,
  convertUpperCase,
  convertCapitalizeFirst,
  getConversationDate,
  getConversationTime,
  getFromNow,
  getDate,
  restElementAfterSplitting,
  returnObjectKeys,
  _returnTaxSum,
  validateEmail,
  //validations pages
  signinValidation,
  resetValidation,
  submitRequestValidation,
  signupValidation,
  floatValidation,
  intValidation,
  accountInfoValidation,
  newAddressValidation,
  returnErrorList,
  getLessThenZeroMessage,
  offerPriceValidation,
  _returnHeaderTitle
};

export default TAKE_TO_CONSTANT;
