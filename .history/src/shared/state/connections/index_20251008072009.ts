import { sample } from 'effector';
import { getProductsListFx } from '../effects';
import { $products } from '../stores';

sample({
  clock: getProductsListFx.doneData,
  fn: (newCount) => newCount,
  target: $products,
});
