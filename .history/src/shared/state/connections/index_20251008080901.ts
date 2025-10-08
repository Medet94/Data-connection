import { sample } from 'effector';
import { getProductsListFx } from '../effects';
import { getProductsClicked } from '../events';

sample({
  clock: getProductsClicked,
  target: getProductsListFx,
});
