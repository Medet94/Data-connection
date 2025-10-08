import { createStore } from 'effector';
import { getProductsListFx } from '../effects';

export const $products = createStore([]);
export const $loading = getProductsListFx.pending;

$products.on(getProductsListFx.doneData, (_, products) => products);
