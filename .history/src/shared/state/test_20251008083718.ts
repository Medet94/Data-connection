import { createEffect } from 'effector';
import { getUsers } from '../../api/automations';

export const getUsersListFx = createEffect(async () => {
  return await getUsers();
});

// event

import { createEvent } from 'effector';

export const getUsersClicked = createEvent();

// store

import { createStore } from 'effector';
import { getUsersListFx } from '../effects';

export const $users = createStore([]);
export const $loading = getUsersListFx.pending;

$users.on(getUsersListFx.doneData, (_, data) => data);
