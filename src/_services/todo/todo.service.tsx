import axios, { AxiosResponse } from 'axios';
import { Todo, TodoUpdate } from '../../_types';
import config from '../../config';

const handleResponse = (response: { data: any; }) => {
  if (response && response.data) {
    return Promise.resolve(response.data);
  }
  return Promise.reject('No Data');
};

const handleDeletionResponse = (response: AxiosResponse<any>) => {
  if (response && response.status === 200) {
    return Promise.resolve();
  }
  return Promise.reject('Server Error');
};


const handleError = (error: { response: { status: number; data: { message: any; }; statusText: any; }; }) => {
  let err;
  if (error && error.response) {
    err = (error.response.data && error.response.data.message) || error.response.statusText;
  } else {
    err = 'Network Error';
  }
  return Promise.reject(err);
};

const getTodos = async (params: any = { page: 1, limit: 10 }) => {
  try {
    const response = await axios.get(`${config.apiUrl}/todo`, { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const addTodo = async (data: Todo) => {
  try {
    const response = await axios.post(`${config.apiUrl}/todo`, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateTodo = async (id: string, data: TodoUpdate) => {
  try {
    const response = await axios.put(`${config.apiUrl}/todo/${id}`, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const deleteTodo = async (id: string) => {
  try {
    const response = await axios.delete(`${config.apiUrl}/todo/${id}`);
    return handleDeletionResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const todoService = {
  getTodos,
  deleteTodo,
  addTodo,
  updateTodo,
};
