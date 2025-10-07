export const $products = createStore([]);

import { createStore } from 'effector';
import { increment, decrement, reset } from '../events';

// создаем store
export const $count = createStore(0)
  .on(increment, (state) => state + 1)
  .on(decrement, (state) => state - 1)
  .on(reset, () => 0);
