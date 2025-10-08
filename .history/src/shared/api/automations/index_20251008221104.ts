import { apiConfig } from '../_base';

export const getUsers = async () => {
  const response = await apiConfig.get('users');
  return response.data;
};

export const getTodos = async () => {
  const response = await apiConfig.get('todos');
  return response.data;
};
