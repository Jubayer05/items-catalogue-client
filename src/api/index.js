import axios from 'axios';

const url = 'http://localhost:5000/items';

export const fetchItems = () => axios.get(url);
export const createItems = (newPost) => axios.post(url, newPost);
export const updateItems = (id, updatedItem) =>
  axios.patch(`${url}/${id}`, updatedItem);
export const deleteItems = (id) => axios.delete(`${url}/${id}`);
export const likeItems = (id) => axios.patch(`${url}/${id}/likeItems`);
