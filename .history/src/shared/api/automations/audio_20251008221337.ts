import { audioApiConfig } from '../_base';

export const getTracks = async () => {
  const response = audioApiConfig.get('tracks?_page=1&_limit=10');

  return (await response).data;
};
