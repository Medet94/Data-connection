import { apiConfig } from 'shared/api';
import {}

export const getProducts = async () => {
  const response = await dataConnectionApi.get(`/api/v1/Connection/${id}`);
  return response.data.data;
};
