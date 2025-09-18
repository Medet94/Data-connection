import { sample } from 'effector';
import {
  pageMounted,
  connectorSelected,
  resetConnectorSelection,
} from '../events';
import { loadConnectorTypes, fetchConnectorParametersFx } from '../effects';
import {
  $selectedConnector,
  $connectorParameters,
  $parametersLoading,
} from '../stores';

sample({
  clock: pageMounted,
  target: loadConnectorTypes,
});

$selectedConnector.on(connectorSelected, (_, connector) => connector);
$selectedConnector.reset(resetConnectorSelection);

// Connect effect to stores
$parametersLoading.on(
  fetchConnectorParametersFx.pending,
  (_, pending) => pending
);

$connectorParameters
  .on(fetchConnectorParametersFx.doneData, (_, parameters) => parameters)
  .reset(fetchConnectorParametersFx.fail);

sample({
  clock: connectorSelected,
  fn: (connector) => connector.type,
  target: fetchConnectorParametersFx,
});

// Reset parameters when connector selection is reset
$connectorParameters.reset(resetConnectorSelection);
