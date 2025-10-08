import { sample } from 'effector';
import { getProductsListFx } from '../effects';
import { getProducts } from '../events';

sample({
  clock: getProducts,
  target: getProductsListFx,
});
