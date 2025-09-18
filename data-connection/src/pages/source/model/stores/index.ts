import { createStore } from 'effector';
import { DataConnection } from '../../../../shared/types';
//import { fetchConnectionsFx, fetchConnectionsByProjectFx } from '../effects';
import { getConnectionsFx } from '../effects';

// export const $connections = createStore<DataConnection[]>([])
//   .on(fetchConnectionsFx.doneData, (_, connections) => connections)
//   .on(fetchConnectionsByProjectFx.doneData, (_, connections) => connections);

export const $isLoading = createStore<boolean>(false).on(
  getConnectionsFx.pending,
  (_, pending) => pending
);

// export const $error = createStore<string | null>(null)
//   .on(
//     fetchConnectionsFx.failData,
//     (_, error) => error.message || 'Failed to fetch connections'
//   )
//   .on(
//     fetchConnectionsByProjectFx.failData,
//     (_, error) => error.message || 'Failed to fetch connections'
//   )
//   .reset([fetchConnectionsFx.done, fetchConnectionsByProjectFx.done]);

export const $connections = createStore<DataConnection[]>([])
  .on(getConnectionsFx.doneData, (_, data) => data)
  .on(getConnectionsFx.fail, () => []);
