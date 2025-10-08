import { apiConfig } from '../_base';

export const getUsers = async () => {
  const response = await apiConfig.get('users');
  return response.data;
};

export const getimages = async () => {
  const response = await apiConfig.get('photos');
  return response.data;
};
