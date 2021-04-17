const API = 'https://ecomnativebackend.herokuapp.com/api';

export const getAllOrderAdmin = userId => {
  return fetch(`${API}/all/orders/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};

export const updateOrderStatus = (userId, orderId) => {
  return fetch(`${API}/update/status/order/${orderId}/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({status: 'Delivered'}),
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};
