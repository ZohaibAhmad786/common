import moment from "moment";
//calander start here
const getMonth=(year=2021,month=11) =>{
  
  let startDate = moment([year, month - 1])
  let endDate = moment(startDate).endOf('month');

  var dates = [];
  var weeks = [];

  var per_week = [];
  var difference = endDate.diff(startDate, 'days');

  per_week.push(startDate.toDate())
  let index = 0;
  let last_week = false;
  while (startDate.add(1, 'days').diff(endDate) < 0) {
    if (startDate.day() != 0) {
      per_week.push(startDate.toDate())
    }
    else {
      if ((startDate.clone().add(7, 'days').month() == (month - 1))) {
        weeks.push(per_week)
        per_week = []
        per_week.push(startDate.toDate())
      }
      else if (Math.abs(index - difference) > 0) {
        if (!last_week) {
          weeks.push(per_week);
          per_week = [];
        }
        last_week = true;
        per_week.push(startDate.toDate());
      }
    }
    index += 1;
    if ((last_week == true && Math.abs(index - difference) == 0) ||
      (Math.abs(index - difference) == 0 && per_week.length == 1)) {
      weeks.push(per_week)
    }
    dates.push(startDate.clone().toDate());
  }
  const fullMonths=[];
  weeks.map(week=>{
      week?.map(day=>{
        fullMonths.push(day);
      })
  });
  return fullMonths;
}




const convertUpperCase = (label='') => {
  return label.toLocaleUpperCase();
};
const convertCapitalizeFirst = (str='') => {
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
const getConversationTime = (time) =>moment(time).format('hh:mm A');
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
const validateEmail = (mail) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
};
//float number validation
const floatValidation = (number) => {
  var patt = new RegExp(/^([0-9]+[.])?[0-9]+$/);
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
const getInvalidFieldMessage = (fieldName) => ({ message: `Oops! you have entered invalid ${fieldName}`, status: false });
const getPasswordMessage = (fieldName) => ({ message: `Oops! your ${fieldName} length must be greater or equal to 8 characters`, status: false });
const getNotMatched = () => ({ message: `Oops! Password and confirm password did not match`, status: false });
const getOkMessage = () => ({ message: `OK`, status: true });
//signin fields validation
const signinValidation = async (fields = {}) => {
  if (!fields?.email?.trim()) {
    console.log("getEmptyFieldMessage", getEmptyFieldMessage("email"));
    return getEmptyFieldMessage("email");
  } else if (!validateEmail(fields?.email)) {
    return getInvalidFieldMessage("email");
  } else if (!fields?.password?.trim()) {
    return getEmptyFieldMessage("password");
  } else if (fields?.password?.trim()?.length < 8) {
    return getPasswordMessage("password");
  }
  return getOkMessage();
};
//reset field validation
const resetValidation = async (fields = {}) => {
  console.log("fields: ", fields);
  if (!fields?.email?.trim()) {
    console.log("getEmptyFieldMessage", getEmptyFieldMessage("email"));
    return getEmptyFieldMessage("email");
  } else if (!validateEmail(fields?.email)) {
    return getInvalidFieldMessage("email");
  }
  return getOkMessage();
};
//sign up validation
const signupValidation = async (fields = {}) => {
  if (!fields?.name?.trim()) {
    console.log("getEmptyFieldMessage", getEmptyFieldMessage("name"));
    return getEmptyFieldMessage("name");
  } else if (!fields?.username?.trim()) {
    console.log("getEmptyFieldMessage", getEmptyFieldMessage("username"));
    return getEmptyFieldMessage("username");
  } else if (!fields?.email?.trim()) {
    console.log("getEmptyFieldMessage", getEmptyFieldMessage("email"));
    return getEmptyFieldMessage("email");
  } else if (!validateEmail(fields?.email)) {
    return getInvalidFieldMessage("email");
  } else if (!fields?.password?.trim()) {
    return getEmptyFieldMessage("password");
  } else if (fields?.password?.trim()?.length < 8) {
    return getPasswordMessage("password");
  } else if (!fields?.cpassword?.trim()) {
    return getEmptyFieldMessage("confirm password");
  } else if (fields?.cpassword?.trim()?.length < 8) {
    return getPasswordMessage("confirm password");
  } else if (!isPasswordsMatched(fields.password, fields.cpassword)) {
    return getNotMatched();
  }
  return getOkMessage();
};
//account info validation
const accountInfoValidation = async (fields = {}) => {
  if (!fields?.name?.trim()) {
    console.log("getEmptyFieldMessage", getEmptyFieldMessage("name"));
    return getEmptyFieldMessage("name");
  } else if (!fields?.username?.trim()) {
    console.log("getEmptyFieldMessage", getEmptyFieldMessage("username"));
    return getEmptyFieldMessage("username");
  }
  return getOkMessage();
};
//new address validation
const newAddressValidation = async (fields = {}) => {
  if (!fields?.addressName?.trim()) {
    return getEmptyFieldMessage("address name");
  } else if (!fields?.area?.trim()) {
    return getEmptyFieldMessage("area");
  } else if (!fields?.block?.trim()) {
    return getEmptyFieldMessage("block");
  } else if (!fields?.street?.trim()) {
    return getEmptyFieldMessage("street");
  } else if (!fields?.addressType?.trim()) {
    return getEmptyFieldMessage("address type");
  } else if (!fields?.building?.trim()) {
    return getEmptyFieldMessage("building");
  } else if (!fields?.floor?.trim()) {
    return getEmptyFieldMessage("floor");
  } else if (!fields?.officeNumber?.trim()) {
    return getEmptyFieldMessage("office number");
  }
  return getOkMessage();
};
const TAKE_TO_CONSTANT = {
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
  //validations pages
  signinValidation,
  resetValidation,
  signupValidation,
  floatValidation,
  intValidation,
  accountInfoValidation,
  newAddressValidation,
};

export default TAKE_TO_CONSTANT;
