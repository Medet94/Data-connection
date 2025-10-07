import { createEffect } from 'effector';
import { getProducts } from '../../api/automations/endpoints';

export const getProductsListFx = createEffect(() => {
  return getProducts();
});
