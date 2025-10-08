import { createStore } from 'effector';
import { increment, decrement, reset, getProducts, getPosts } from '../events';

export const $count = createStore(0)
  .on(increment, (state) => state + 1)
  .on(decrement, (state) => state - 1)
  .on(reset, () => 0);

export const $products = createStore([]).on(getProducts, (_, state) => state);
export const $posts = createStore({}).on(getPosts, (state) => state);
