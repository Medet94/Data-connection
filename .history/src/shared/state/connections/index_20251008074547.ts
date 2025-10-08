import { sample } from 'effector';
import { getProductsListFx } from '../effects';
import { getProducts } from '../events';

sample({
  clock: getProducts,
  target: getProductsListFx,
});

import { sample } from 'effector';
import { loadProducts } from '../events';
import { getProductsListFx } from '../effects';

// Когда вызывается loadProducts, запускаем effect
sample({ clock: loadProducts, target: getProductsListFx });
