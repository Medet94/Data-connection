import { createEvent, sample } from 'effector';
import {
  SourceType,
  ConnectionMethod,
  ProjectReference,
  SourceConfig,
} from '#/shared/types';
import {
  testConnectionFx,
  createSourceFx,
  generateOutputLocationFx,
  discoverDatabasesFx,
  fetchConnectorTypesFx,
} from '../effects';

// Page lifecycle events
export const pageMounted = createEvent('wizard/pageMounted');
export const pageUnmounted = createEvent('wizard/pageUnmounted');

// Wizard navigation events
export const stageChanged = createEvent<number>('wizard/stageChanged');
export const sourceTypeSelected = createEvent<SourceType>(
  'wizard/sourceTypeSelected'
);
export const connectionMethodSelected = createEvent<ConnectionMethod>(
  'wizard/connectionMethodSelected'
);

// Form data events
export const connectionNameUpdated = createEvent<string>(
  'wizard/connectionNameUpdated'
);
export const projectSelected = createEvent<ProjectReference>(
  'wizard/projectSelected'
);
export const connectionDetailsUpdated = createEvent<Partial<SourceConfig>>(
  'wizard/connectionDetailsUpdated'
);
export const outputLocationSelected = createEvent<string>(
  'wizard/outputLocationSelected'
);

// Wizard completion

export const wizardCancelled = createEvent('wizard/wizardCancelled');

// Loading states
export const loadingStarted = createEvent<string>('wizard/loadingStarted');
export const loadingFinished = createEvent('wizard/loadingFinished');

// Validation events
export const validationFailed = createEvent<Record<string, string>>(
  'wizard/validationFailed'
);
export const validationPassed = createEvent('wizard/validationPassed');

// Connection testing
export const connectionTestStarted = createEvent(
  'wizard/connectionTestStarted'
);
export const connectionTestSuccess = createEvent(
  'wizard/connectionTestSuccess'
);
export const connectionTestFailed = createEvent<string>(
  'wizard/connectionTestFailed'
);

// API action events
export const testConnection = createEvent<{
  sourceType: string;
  connectionDetails: Record<string, any>;
}>('wizard/testConnection');
export const createSource = createEvent<{
  sourceType: string;
  connectionMethod: 'direct' | 'agent';
  connectionName: string;
  projectId: string;
  connectionDetails: Record<string, any>;
  outputLocation: string;
}>('wizard/createSource');
export const generateOutputLocation = createEvent<{
  projectPath: string;
  connectionName: string;
}>('wizard/generateOutputLocation');
export const discoverDatabases = createEvent<{
  sourceType: string;
  connectionDetails: Record<string, any>;
}>('wizard/discoverDatabases');
export const fetchConnectorTypes = createEvent('wizard/fetchConnectorTypes');

export const wizardReset = createEvent('wizard/wizardReset');

sample({
  clock: testConnection,
  target: testConnectionFx,
});

sample({
  clock: createSource,
  target: createSourceFx,
});

sample({
  clock: generateOutputLocation,
  target: generateOutputLocationFx,
});

sample({
  clock: discoverDatabases,
  target: discoverDatabasesFx,
});

sample({
  clock: fetchConnectorTypes,
  target: fetchConnectorTypesFx,
});

// Auto-fetch connector types when wizard is mounted
sample({
  clock: pageMounted,
  target: fetchConnectorTypesFx,
});
