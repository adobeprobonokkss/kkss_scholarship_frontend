import {
  userSession,
  SESSION_STORAGE_USERS_KEY,
  defaultUserSession,
} from "./../interface/UserSession";

import CryptoJS from "crypto-js";

export const formatDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};

export const API_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
};

export const API_TIMEOUT = 10000;

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string, value: string) => {
  localStorage.getItem(key);
};

export const getUsersInfo = (): userSession => {
  const sessionInfo = sessionStorage.getItem(SESSION_STORAGE_USERS_KEY) ?? null;
  if (sessionInfo) {
    return JSON.parse(decryptData(sessionInfo));
  } else {
    return defaultUserSession;
  }
};

export const setUserInfo = (userDetails: object) => {
  sessionStorage.setItem(
    SESSION_STORAGE_USERS_KEY,
    encryptData(JSON.stringify(userDetails))
  );
};

export const destroySession = () => {
  sessionStorage.removeItem(SESSION_STORAGE_USERS_KEY);
};

const secretPass = "XkhZG4fW2t2W";

const encryptData = (text: string) => {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    secretPass
  ).toString();
  return data;
};

const decryptData = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(text, secretPass);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log(data);
  return data;
};
