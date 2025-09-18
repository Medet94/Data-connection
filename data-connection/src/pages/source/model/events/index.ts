import { createEvent } from 'effector';
import { sample } from 'effector';
import { getConnectionsFx } from '../effects';

export const pageMounted = createEvent<void>();
export const pageUnmounted = createEvent<void>();
export const fetchConnections = createEvent('source/fetchConnections');
export const retryFetch = createEvent('source/retryFetch');

sample({
  clock: pageMounted,
  target: getConnectionsFx,
});

sample({
  clock: retryFetch,
  target: getConnectionsFx,
});
