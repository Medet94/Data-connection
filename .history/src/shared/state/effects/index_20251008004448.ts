import { createEffect } from 'effector';
import { getProducts, getPosts } from '../../api/automations';

export const getProductsListFx = createEffect(() => {
  return getProducts();
});

export const getPostsFx = createEffect((id: number) => {
  return getPosts(id);
});
