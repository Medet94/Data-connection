import { createStore } from 'effector';
import { getProductsListFx } from '../effects';

export const $products = createStore([]).on(
  getProductsListFx.doneData,
  (_, state) => state
);
