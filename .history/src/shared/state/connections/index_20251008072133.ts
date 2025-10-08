import { sample } from 'effector';
import { getProductsListFx } from '../effects';
import { getProducts } from '../events';
import { $products } from '../stores';

sample({
  clock: getProducts,
  target: getProductsListFx,
});
