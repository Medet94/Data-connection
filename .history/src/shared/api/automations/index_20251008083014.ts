import { apiConfig } from '../_base';

export const getUsers = async () => {
  const response = await apiConfig.get('users');
  return response.data;
};
