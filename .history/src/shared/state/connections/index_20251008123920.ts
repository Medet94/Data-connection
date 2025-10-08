import { sample } from 'effector';
import { getUsersClicked } from '../events';
import { getUsersListFx, getTodosListFx } from '../effects';

sample({
  clock: getUsersClicked,
  target: [getUsersListFx, getTodosListFx],
});

console.log('connections loaded');
