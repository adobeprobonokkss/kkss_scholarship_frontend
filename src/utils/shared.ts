import {
  userSession,
  SESSION_STORAGE_USERS_KEY,
  defaultUserSession,
} from "./../interface/UserSession";

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
    return JSON.parse(sessionInfo);
  } else {
    return defaultUserSession;
  }
};

export const setUserInfo = (userDetails: object) => {
  sessionStorage.setItem(
    SESSION_STORAGE_USERS_KEY,
    JSON.stringify(userDetails)
  );
};

export const destroySession = () => {
  sessionStorage.removeItem(SESSION_STORAGE_USERS_KEY);
};
