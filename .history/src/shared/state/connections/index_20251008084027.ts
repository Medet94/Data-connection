import { sample } from 'effector';
import { getUsersClicked } from '../events';
import { getUsersListFx } from '../effects';

sample({
  clock: getUsersClicked,
  target: getUsersListFx,
});
