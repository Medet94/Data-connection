import { createStore, createEffect } from 'effector';
import axios from 'axios';

export interface Project {
  id: string;
  name: string;
  description?: string;
}

export const fetchProjectsFx = createEffect(async () => {
  const { data } = await axios.get<Project[]>('/api/projects');
  return data;
});

export const $projects = createStore<Project[]>([]).on(
  fetchProjectsFx.doneData,
  (_, projects) => projects
);
