import { createEvent } from 'effector';
import { ConnectorType } from '#/shared/types';

export const pageMounted = createEvent<void>();
export const pageUnmounted = createEvent<void>();

export const connectorSelected = createEvent<ConnectorType>();
export const resetConnectorSelection = createEvent<void>();
