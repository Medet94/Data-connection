import { apiConfig } from '../_base';

export const getProducts = async () => {
  const response = await apiConfig.get('users');
  return response.data;
};
