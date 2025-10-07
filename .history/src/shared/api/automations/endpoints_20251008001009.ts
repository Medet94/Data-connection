import { apiConfig } from 'shared/api';

export const getProducts = async () => {
  const response = await apiConfig.get('products');
  return response.data.data;
};
