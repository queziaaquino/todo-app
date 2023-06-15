import axios from 'axios';
import uuid from 'react-native-uuid';

const instance = axios.create({
  baseURL: 'https://todo-app-wx01.onrender.com', // Altere para a URL correta da API
});

let userId = '';

export const fetchListas = async () => {
  try {
    console.log(userId)
    const response = await instance.get(`/user/${userId}/lists`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const adicionarLista = async (name) => {
  try {
    const id = uuid.v4();
    const response = await instance.post(`/user/${userId}/list`, { id, name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removerLista = async (listId) => {
  try {
    await instance.delete(`/user/${userId}/list/${listId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchListIdByName = async (name) => {
  try {
    const response = await instance.get(`/user/${userId}/lists`);
    const lists = response.data;
    const list = lists.find((list) => list.name === name);
    return list ? list.id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchItemsByListId = async (listId) => {
  try {
    const response = await instance.get(`/user/${userId}/list/${listId}/items`);
    const items = response.data;
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteItemById = async (listId, itemId) => {
  try {
    await instance.delete(`/user/${userId}/list/${listId}/item/${itemId}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateItemById = async (listId, itemId, isChecked) => {
  try {
    await instance.put(`/user/${userId}/list/${listId}/item/${itemId}`, { isChecked });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchUser = async (username, password) => {
  try {
    const response = await instance.post('/user/login', { username, password });
    console.log(response)
    userId = response.data.id;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addNewItem = async (listId, newItem) => {
  const { id, name } = newItem
  try {
    const response = await instance.post(`/user/${userId}/list/${listId}/item`, { id, name });
    console.log(response)
    userId = response.data.id;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

