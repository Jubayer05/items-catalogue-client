import * as api from '../api';
import { FETCH_ALL, UPDATE, CREATE, DELETE } from '../constants/actionType';

export const getItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItems();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createItems = (post) => async (dispatch) => {
  try {
    const { data } = await api.createItems(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateItems = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateItems(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItems = (id) => async (dispatch) => {
  try {
    await api.deleteItems(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likeItems = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeItems(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
