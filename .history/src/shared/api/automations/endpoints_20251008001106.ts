import { apiConfig } from 'shared/api/_base';

export const getProducts = async () => {
  const response = await apiConfig.get('products');
  return response.data.data;
};
