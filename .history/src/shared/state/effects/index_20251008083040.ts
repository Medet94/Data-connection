import { createEffect } from 'effector';
import { getUsers } from '../../api/automations';

export const getUsersListFx = createEffect(async () => {
  return await getUsers();
});
