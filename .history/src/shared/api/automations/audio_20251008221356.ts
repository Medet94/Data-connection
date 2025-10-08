import { audioApiConfig } from '../_base';

export const getTracks = async () => {
  const response = await audioApiConfig.get('tracks?_page=1&_limit=10');
  return response.data;
};
