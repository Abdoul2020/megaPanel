import cookie from "js-cookie";
import { authClientTokenCheck } from "../features/auth/authAPI";

// Set Cookie

export const setCookie = (key: any, value: any) => {
  if (window) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cOOkie

export const removeCookie = (key: any) => {
  if (window) {
    cookie.remove(key);
  }
};

// get from cookie such as stored token

export const getCookie = (key: any) => {
  if (window) {
    return cookie.get(key);
  }
};

// get in localstorage

export const getLocalStorage = (key: any) => {
  if (window) {
    return localStorage.getItem(key);
  }
};

// set in localstorage

export const setLocalStorage = (key: any, value: any) => {
  if (window) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage

export const removeLocalStorage = (key: any) => {
  if (window) {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage during signin

export const authenticate = (response: any, next: any, remind_me?: any) => {
  setCookie("m_t", response.data.token);
  setLocalStorage("rmm_c", {
    rmm: remind_me !== undefined ? remind_me : false,
    rmm_t: response.data.remind_me_token,
  });
  next();
};
export const unauthenticate = (next: any) => {
  removeCookie("m_t");
  next();
};

export const unauthenticatehard = (next: any) => {
  removeCookie("m_t");
  removeLocalStorage("rmm_c");
  next();
};


// access user info from localstorage

export const isAuth = () => {
  if (window) {
    const cookieCheck = getCookie("m_t");
    // const response = await authClientTokenCheck(cookieCheck);
    // const success = response.success;
    if (!cookieCheck) {
      return false;
    }
    return true;
  }
};
