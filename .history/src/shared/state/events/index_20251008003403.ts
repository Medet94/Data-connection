import { createEvent } from 'effector';

// создаем события
export const increment = createEvent();
export const decrement = createEvent();
export const reset = createEvent();

// Async

export const getFx = createEvent();
