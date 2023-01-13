import cookie from "js-cookie";

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

export const authenticateExpert = (response: any, next: any) => {
  setCookie("m_e_t", response.data.token);
  setLocalStorage("m_e_u", response.data.user);
  next();
};
export const unauthenticateExpert = (next: any) => {
  removeCookie("m_e_t");
  next();
};

// access user info from localstorage

export const isAuthExpert = () => {
  if (window) {
    const cookieCheck = getCookie("m_e_t");
    // const response = await authClientTokenCheck(cookieCheck);
    // const success = response.success;
    if (!cookieCheck) {
      return false;
    }
    return true;
  }
};
