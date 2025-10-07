import { apiConfig } from 'shared/api/_base';

export const getProducts = async () => {
  const response = await apiConfig.get('products');
  return response.data.data;
};

export const getPosts = async (id: number) => {
  const res = await apiConfig.get(`posts/${id}`);
  return res.data.id;
};
