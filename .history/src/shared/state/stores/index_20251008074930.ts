import { createStore } from 'effector';
import { getProductsListFx } from '../effects';

export const $products = createStore([]).on(
  getProductsListFx.doneData,
  (_, products) => products
);

export const $loading = getProductsListFx.pending;
