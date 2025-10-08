import { createStore } from 'effector';
import { getUsersListFx } from '../effects';

export const $products = createStore([]);
export const $loading = getUsersListFx.pending;

$products.on(getUsersListFx.doneData, (_, products) => products);
