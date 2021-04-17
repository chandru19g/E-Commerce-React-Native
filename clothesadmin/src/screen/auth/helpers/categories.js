const API = 'https://ecomnativebackend.herokuapp.com/api';
export const fetchAllCategories = () => {
  return fetch(`${API}/all/category`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(error => console.error(error));
};

export const addCategorytoDB = input => {
  return fetch(`${API}/add/category`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })
    .then(res => {
      res.json();
      console.log(res);
    })
    .catch(error => console.error(error));
};

export const getEachCategoryDetails = categoryId => {
  return fetch(`${API}/category/${categoryId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};

export const deleteCategory = categoryId => {
  return fetch(`${API}/delete/${categoryId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`,
    },
  })
    .then(result => {
      result.json();
      console.log('Result', result);
    })
    .catch(error => console.error(error));
};

export const updatCategory = (categoryId, input) => {
  return fetch(`${API}/edit/category/${categoryId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};
