import { sample } from 'effector';
import { getUsersListFx } from '../effects';
import { getUsersClicked } from '../events';

sample({
  clock: getUsersListFx,
  target: getUsersClicked,
});
