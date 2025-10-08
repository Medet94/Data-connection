import { sample } from 'effector';
import { getUsersClicked, audioRequest, nextTrackClicked } from '../events';
import { getUsersListFx, getTodosListFx, getAudiosFx } from '../effects';
import { $audios, $currentTrackIndex } from '../stores';

sample({
  clock: getUsersClicked,
  target: [getUsersListFx, getTodosListFx],
});

sample({
  clock: audioRequest,
  target: getAudiosFx,
});

// Когда жмём "Next" → увеличиваем индекс
sample({
  clock: nextTrackClicked,
  source: { audios: $audios, index: $currentTrackIndex },
  fn: ({ audios, index }) => (index + 1 < audios.length ? index + 1 : 0),
  target: $currentTrackIndex,
});
