import { createStore } from 'effector';
import { ConnectorType, ConnectorParameter } from '#/shared/types';

export const $isLoading = createStore<boolean>(false);
export const $selectedConnector = createStore<ConnectorType | null>(null);
export const $connectorParameters = createStore<ConnectorParameter[]>([]);
export const $parametersLoading = createStore<boolean>(false);
