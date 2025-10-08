import { sample } from 'effector';
import { getUsersListFx } from '../effects';
import { getUsersClicked } from '../events';

sample({
  clock: getUsersClicked,
  target: getUsersListFx,
});
