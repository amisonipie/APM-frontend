import axios from "axios";

const auth = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const checkIsAnyLetterInString = (str) => {
  const regExp = /[a-zA-Z]/g;
  return regExp.test(str);
};

// Phone validation only for SA 12 digits (966 123 456 789)
export const phoneValidator = (value) => value.match(/\d/g)?.length === 12;

export const emailValidator = (value) => String(value)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export const isEmailOrPhone = (str) => {
  if (checkIsAnyLetterInString(str)) {
    if (!emailValidator(str)) {
      return "Please enter a valid email!";
    }
  } else if (!phoneValidator(str.replaceAll("+", ""))) {
    return "Please enter a valid phone!";
  }
};

export const getValidEmailOrPhone = (str) => {
  str = str.toLocaleLowerCase().trim();
  if (!checkIsAnyLetterInString(str)) {
    // Remove + from the phone number
    str = str.replaceAll("+", "");
  }

  return str;
};

export default auth;
