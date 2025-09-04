import axios from 'axios';
import { createEvent, createStore, createEffect } from 'effector';

export const fetchConnectionsRequest = async () => {
  const response = await axios.get(
    'https://phoenix-dev.datamicron.com/api/data-loader-bff/api/v1/Connection/search'
  );
  return response.data;
};

export const openDeleteModal = createEvent<string>();
export const closeDeleteModal = createEvent();

export const deleteConnectionFx = createEffect(async (id: string) => {
  await axios.delete(
    `https://phoenix-dev.datamicron.com/api/data-loader-bff/api/v1/Connection/${id}`
  );
  return id;
});

export const $deleteModal = createStore<{ opened: boolean; id: string | null }>(
  {
    opened: false,
    id: null,
  }
)
  .on(openDeleteModal, (_, id) => ({ opened: true, id }))
  .reset(closeDeleteModal);

$deleteModal.on(deleteConnectionFx.done, () => ({ opened: false, id: null }));
