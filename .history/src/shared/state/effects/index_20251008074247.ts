import { createEffect } from 'effector';
import { getProducts } from '../../api/automations';

export const getProductsListFx = createEffect(() => {
  return getProducts();
});
