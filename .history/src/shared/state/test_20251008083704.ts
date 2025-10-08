import { createEffect } from 'effector';
import { getUsers } from '../../api/automations';

export const getUsersListFx = createEffect(async () => {
  return await getUsers();
});

// event

import { createEvent } from 'effector';

export const getUsersClicked = createEvent();
