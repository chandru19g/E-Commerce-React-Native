const API = 'https://ecomnativebackend.herokuapp.com/api';

export const addProduct = input => {
  return fetch(`${API}/add/product`, {
    method: 'POST',
    headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      //   'Content-Type': 'multipart/form-data; ',
      //   Authorization: `Bearer ${token}`,
    },
    body: input,
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};

export const getAllProducts = () => {
  return fetch(`${API}/all/products`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};

export const getEachProduct = categoryId => {
  return fetch(`${API}/category/product/${categoryId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};

export const getProductByProductId = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};

export const deleteProduct = productId => {
  return fetch(`${API}/delete/product/${productId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`,
    },
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};
