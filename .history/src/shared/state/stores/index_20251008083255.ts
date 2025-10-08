import { createStore } from 'effector';
import { getUsersListFx } from '../effects';

export const $users = createStore([]);
export const $loading = getUsersListFx.pending;

$users.on(getUsersListFx.doneData, (_, data) => data);
