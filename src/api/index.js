/* eslint-disable no-undef */
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://items-catalogue.herokuapp.com',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

// const url = '';

export const fetchItems = () => API.get('/items');
export const createItems = (newPost) => API.post('/items', newPost);
export const updateItems = (id, updatedItem) =>
  API.patch(`/items/${id}`, updatedItem);
export const deleteItems = (id) => API.delete(`/items/${id}`);
export const likeItems = (id) => API.patch(`/items/${id}/likeItems`);

export const signIn = (formData) => API.post('users/signin', formData);
export const signUp = (formData) => API.post('users/signup', formData);
