import axios from 'axios';

import { NewUser, User } from './types/User';

const baseURL = 'http://frontend-candidate.dev.sdh.com.ua/v1/contact/';

export const client = axios.create({
  baseURL
});

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await client.get('');
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getUser = async (id: number): Promise<User> => {
  try {
    const response = await client.get(`${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const editUser = async (id: number): Promise<User> => {
  try {
    const response = await client.put(`${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const createUser = async (user: NewUser): Promise<User> => {
  try {
    const response = await client.post(``, user);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const removeUser = async (id: number): Promise<User> => {
  try {
    const response = await client.delete(`${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
