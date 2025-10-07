import { createStore, createEvent, createEffect, sample } from 'effector';
import { apiClient } from '@/shared/api';
import type { User, UsersState } from '../types';

/**
 * EFFECTOR DEMO: Entities Layer
 *
 * Этот файл демонстрирует использование Effector для управления состоянием сущности User
 *
 * 1. createEffect - для асинхронных операций (API запросы)
 * 2. createEvent - для синхронных событий
 * 3. createStore - для хранения состояния
 * 4. sample - для связывания событий и эффектов
 */

// ============================================
// EFFECTS (асинхронные операции)
// ============================================

/**
 * createEffect - создает эффект для загрузки пользователей
 * Effect автоматически генерирует события: pending, done, fail
 */
export const fetchUsersFx = createEffect<void, User[], Error>(async () => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
});

/**
 * Эффект для загрузки одного пользователя по ID
 */
export const fetchUserByIdFx = createEffect<number, User, Error>(async (userId) => {
  const response = await apiClient.get<User>(`/users/${userId}`);
  return response.data;
});

// ============================================
// EVENTS (синхронные события)
// ============================================

/**
 * createEvent - создает событие для выбора пользователя
 * События используются для изменения состояния синхронно
 */
export const userSelected = createEvent<number>();

/**
 * Событие для очистки ошибок
 */
export const errorCleared = createEvent();

/**
 * Событие для сброса состояния
 */
export const usersReset = createEvent();

// ============================================
// STORES (хранилища состояния)
// ============================================

/**
 * createStore - создает хранилище для состояния пользователей
 * Store реагирует на события и эффекты
 */
export const $usersState = createStore<UsersState>({
  users: [],
  isLoading: false,
  error: null,
  selectedUserId: null,
})
  // Обработка начала загрузки (когда fetchUsersFx запускается)
  .on(fetchUsersFx.pending, (state, isLoading) => ({
    ...state,
    isLoading,
  }))
  // Обработка успешной загрузки (когда fetchUsersFx завершается успешно)
  .on(fetchUsersFx.doneData, (state, users) => ({
    ...state,
    users,
    isLoading: false,
    error: null,
  }))
  // Обработка ошибки загрузки
  .on(fetchUsersFx.failData, (state, error) => ({
    ...state,
    isLoading: false,
    error: error.message,
  }))
  // Обработка выбора пользователя
  .on(userSelected, (state, userId) => ({
    ...state,
    selectedUserId: userId,
  }))
  // Очистка ошибок
  .on(errorCleared, (state) => ({
    ...state,
    error: null,
  }))
  // Сброс состояния
  .reset(usersReset);

// ============================================
// DERIVED STORES (производные хранилища)
// ============================================

/**
 * Производное хранилище - выбранный пользователь
 * Автоматически обновляется при изменении $usersState
 */
export const $selectedUser = $usersState.map((state) => {
  if (!state.selectedUserId) return null;
  return state.users.find((user) => user.id === state.selectedUserId) || null;
});

/**
 * Производное хранилище - количество пользователей
 */
export const $usersCount = $usersState.map((state) => state.users.length);

// ============================================
// SAMPLE (связывание событий и эффектов)
// ============================================

/**
 * sample - связывает событие userSelected с эффектом fetchUserByIdFx
 * Когда происходит событие userSelected, автоматически вызывается fetchUserByIdFx
 *
 * Параметры:
 * - clock: событие-триггер (когда оно произойдет)
 * - target: эффект или событие, которое нужно вызвать
 */
sample({
  clock: userSelected, // когда происходит выбор пользователя
  target: fetchUserByIdFx, // загрузить детальную информацию
});

/**
 * sample с filter - демонстрация фильтрации
 * Можно добавить условие, когда должен сработать target
 */
sample({
  clock: fetchUsersFx.doneData,
  source: $usersState,
  filter: (state) => state.users.length > 0, // только если есть пользователи
  fn: (state) => `Загружено пользователей: ${state.users.length}`,
  target: createEvent<string>(), // можно отправить в другое событие
});
