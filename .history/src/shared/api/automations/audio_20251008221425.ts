import { audioApiConfig } from '../_base';

export const getTracks = async () => {
  const response = await audioApiConfig.get('tracks/1');
  return response.data;
};
