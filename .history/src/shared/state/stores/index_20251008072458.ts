import { createStore } from 'effector';
import { increment, decrement, reset } from '../events';
import { getProductsListFx } from '../effects';

export const $count = createStore(0)
  .on(increment, (state) => state + 1)
  .on(decrement, (state) => state - 1)
  .on(reset, () => 0);

export const $products = createStore([]).on(
  getProductsListFx.doneData,
  (_, state) => state
);
