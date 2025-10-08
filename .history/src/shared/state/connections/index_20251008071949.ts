import { sample } from 'effector';
import { getProductsListFx } from '../effects';
import { $products } from '../stores';

// Когда effect успешно выполнен, обновляем $count
sample({
  clock: getProductsListFx.doneData,
  fn: (newCount) => newCount,
  target: $products,
});
