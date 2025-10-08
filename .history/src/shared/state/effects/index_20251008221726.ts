import { createEffect } from 'effector';
import { getUsers, getTodos } from '../../api/automations';
import { getTracks } from '../../api/automations/audio';

export const getUsersListFx = createEffect(async () => {
  return await getUsers();
});

export const getTodosListFx = createEffect(async () => {
  return await getTodos();
});

export const getAudios = createEffect(async () => {
  return await getTracks();
});
