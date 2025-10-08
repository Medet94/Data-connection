import { sample } from 'effector';
import { getUsersClicked, audioRequest } from '../events';
import { getUsersListFx, getTodosListFx, getAudiosFx } from '../effects';

sample({
  clock: getUsersClicked,
  target: [getUsersListFx, getTodosListFx],
});

sample({
  clock: audioRequest,
  target: getAudiosFx,
});
