import { createEvent, createStore, createEffect } from 'effector';
import { createAutomation } from '../../entities/automation/api';
import { Automation } from '../../entities/automation/types';

export const setName = createEvent<string>();
export const setDescription = createEvent<string>();
export const resetForm = createEvent();

export const $name = createStore('')
  .on(setName, (_, v) => v)
  .reset(resetForm);

export const $description = createStore('')
  .on(setDescription, (_, v) => v)
  .reset(resetForm);

export const createFx = createEffect<Partial<Automation>, any>(
  async (payload) => {
    const result = await createAutomation(payload);
    return result;
  }
);

export const submitCreate = createEvent();

$name.watch((v) => console.log('[name]', v));

// Когда submitCreate — вызываем createFx с текущими данными
submitCreate.watch(() => console.log('submit requested'));

export const $isSubmitting = createStore(false).on(
  createFx.pending,
  (_, p) => p
);

createFx.done.watch(() => resetForm());
