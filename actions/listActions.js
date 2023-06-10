import axios from 'axios';
import uuid from 'react-native-uuid';

const instance = axios.create({
  baseURL: 'http://192.168.0.5:3000', // alterar
});

export const fetchListas = async () => {
  try {
    const response = await instance.get('list');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const adicionarLista = async (name) => {
  try {
    const id = uuid.v4();
    const response = await instance.post('list', { id, name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removerLista = async (id) => {
  try {
    await instance.delete(`list/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchListIdByName = async (name) => {
  try {
    const response = await instance.get('list');
    const lists = response.data;
    const list = lists.find((list) => list.name === name);
    return list ? list.id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchItemsByListId = async (id) => {
  try {
    const response = await instance.get(`/itens/${id}`);
    const itens = response.data;
    return itens;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteItemById = async (id) => {
  try {
    await instance.delete(`/item/${id}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};