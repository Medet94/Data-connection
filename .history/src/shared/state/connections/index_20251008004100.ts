import { sample } from 'effector';
import { getProductsListFx } from '../effects';
import { $count } from '../stores';

// Когда effect успешно выполнен, обновляем $count
sample({
  clock: getProductsListFx.doneData,
  fn: (newCount) => newCount,
  target: $count,
});
