import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'https://ecomnativebackend.herokuapp.com/api';
export const isAuthenticated = () => {
  if (AsyncStorage.getItem('key')) {
    return JSON.parse(AsyncStorage.getItem('key'));
  }
  return false;
};
export const isAdmin = () => {
  if (AsyncStorage.getItem('ecom_native')) {
    let {user} = JSON.parse(AsyncStorage.getItem('ecom_native'));
    console.log('users', user.role);
    if (val.user.role || user.role === 1) return true;
  }

  return false;
};
export const authenticate = data => {
  if (typeof window !== undefined) {
    AsyncStorage.setItem('ecom_native', JSON.stringify(data));
  }
};

export const getOTP = email => {
  return fetch(`${API}/forgotpassword`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};

export const savePasswordtoDB = input => {
  return fetch(`${API}/set/password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};
