import {createEvent} from "effector";

//Page events
export const pageMounted = createEvent<void>();
export const pageUnmounted = createEvent<void>();