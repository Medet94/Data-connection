import { createEvent, sample } from 'effector';
import { Resource } from '#/shared/types';
import {
  fetchSourceDetailsFx,
  fetchResourceTreeFx,
  fetchResourcePreviewFx,
  validateSourceConnectionFx,
  fetchConnectionDetailsFx,
} from '../effects';

export const pageMounted = createEvent('explore/pageMounted');
export const pageUnmounted = createEvent('explore/pageUnmounted');

export const sourceInitialized = createEvent<string>(
  'explore/sourceInitialized'
);

export const resourceSelected = createEvent<Resource>(
  'explore/resourceSelected'
);
export const resourceDeselected = createEvent('explore/resourceDeselected');

export const searchQueryChanged = createEvent<string>(
  'explore/searchQueryChanged'
);
export const resourcesFiltered = createEvent<Resource[]>(
  'explore/resourcesFiltered'
);

export const resourceDataLoading = createEvent<string>(
  'explore/resourceDataLoading'
);
export const resourceDataLoaded = createEvent<any[]>(
  'explore/resourceDataLoaded'
);
export const resourceDataError = createEvent<string>(
  'explore/resourceDataError'
);

export const fetchSourceDetails = createEvent<string>(
  'explore/fetchSourceDetails'
);
export const fetchResourceTree = createEvent<string>(
  'explore/fetchResourceTree'
);
export const fetchResourcePreview = createEvent<{
  sourceId: string;
  resourceId: string;
  limit?: number;
}>('explore/fetchResourcePreview');
export const validateConnection = createEvent<string>(
  'explore/validateConnection'
);
export const fetchConnectionDetails = createEvent<string>(
  'explore/fetchConnectionDetails'
);

export const tableConfigOpened = createEvent('explore/tableConfigOpened');
export const tableConfigClosed = createEvent('explore/tableConfigClosed');
export const columnMappingUpdated = createEvent<any>(
  'explore/columnMappingUpdated'
);

export const createSyncTriggered = createEvent('explore/createSyncTriggered');
export const multiSyncTriggered = createEvent<Resource[]>(
  'explore/multiSyncTriggered'
);

sample({
  clock: fetchSourceDetails,
  target: fetchSourceDetailsFx,
});

sample({
  clock: fetchResourceTree,
  target: fetchResourceTreeFx,
});

sample({
  clock: fetchResourcePreview,
  target: fetchResourcePreviewFx,
});

sample({
  clock: validateConnection,
  target: validateSourceConnectionFx,
});

sample({
  clock: fetchConnectionDetails,
  target: fetchConnectionDetailsFx,
});

// Auto-fetch source details when source is initialized
sample({
  clock: sourceInitialized,
  target: fetchSourceDetailsFx,
});

// Auto-fetch resource tree when source details are loaded
sample({
  clock: fetchSourceDetailsFx.doneData,
  fn: (sourceDetails) => sourceDetails.id,
  target: fetchResourceTreeFx,
});

// Auto-fetch resource preview when resource is selected
sample({
  clock: resourceSelected,
  source: sourceInitialized,
  fn: (sourceId, resource) => ({
    sourceId,
    resourceId: resource.id,
    limit: 100,
  }),
  target: fetchResourcePreviewFx,
});
