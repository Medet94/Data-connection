import { createEffect } from 'effector';
import { getUsers, getTodos } from '../../api/automations';

export const getUsersListFx = createEffect(async () => {
  return await getUsers();
});

export const getTodosListFx = createEffect(async () => {
  return await getTodos();
});
