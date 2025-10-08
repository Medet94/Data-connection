import { createStore } from 'effector';
import { getUsersListFx, getTodosListFx, getAudiosFx } from '../effects';

export const $users = createStore([]);
export const $loading = getUsersListFx.pending && getTodosListFx.pending;

$users.on(getUsersListFx.doneData, (_, data) => data);

export const $todos = createStore([]);

$todos.on(getTodosListFx.doneData, (_, todo) => todo);

export const $audios = createStore({});
export const $load = getAudiosFx.pending;

$audios.on(getAudiosFx.doneData, (_, audio) => audio);
