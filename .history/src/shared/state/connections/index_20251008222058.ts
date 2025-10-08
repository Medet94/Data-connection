import { sample } from 'effector';
import { getUsersClicked } from '../events';
import { getUsersListFx, getTodosListFx, getAudiosFx } from '../effects';

sample({
  clock: getUsersClicked,
  target: [getUsersListFx, getTodosListFx],
});

console.log('connections loaded');
