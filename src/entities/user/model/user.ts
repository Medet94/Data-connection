import { createStore, createEvent, createEffect } from 'effector';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export const setUser = createEvent<User | null>();
export const logoutUser = createEvent();

export const fetchUserFx = createEffect(async () => {
  const { data } = await axios.get<User>('/api/user');
  return data;
});

export const $user = createStore<User | null>(null)
  .on(setUser, (_, user) => user)
  .on(fetchUserFx.doneData, (_, user) => user)
  .reset(logoutUser);
