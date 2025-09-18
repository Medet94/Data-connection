import { createEffect } from 'effector';
import { dataConnectionApi } from '#/shared/api';
import {
  ConnectorParametersResponse,
  ConnectorParameter,
} from '#/shared/types';

export const loadConnectorTypes = createEffect<string, void>();

export const fetchConnectorParametersFx = createEffect<
  string,
  ConnectorParameter[]
>(async (connectorType: string) => {
  const response = await dataConnectionApi.get<ConnectorParametersResponse>(
    `/api/v1/Connection/connector-parameters/${connectorType}`
  );

  if (response.data.status === 'success') {
    return response.data.data.parameters;
  }

  throw new Error(
    response.data.message || 'Failed to fetch connector parameters'
  );
});
