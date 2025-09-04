import { createStore } from 'effector';
import { Resource } from '#/shared/types';
import {
  pageMounted,
  pageUnmounted,
  resourceSelected,
  resourceDeselected,
  searchQueryChanged,
  resourcesFiltered,
  resourceDataLoading,
  resourceDataLoaded,
  resourceDataError,
  tableConfigOpened,
  tableConfigClosed,
  columnMappingUpdated,
} from '../events';
import {
  fetchSourceDetailsFx,
  fetchResourceTreeFx,
  fetchResourcePreviewFx,
  validateSourceConnectionFx,
  fetchConnectionDetailsFx,
} from '../effects';

// Page state
export const $isPageMounted = createStore(false)
  .on(pageMounted, () => true)
  .on(pageUnmounted, () => false);

// Source details
export const $sourceDetails = createStore<any>(null)
  .on(fetchSourceDetailsFx.doneData, (_, sourceDetails) => sourceDetails)
  .reset(pageUnmounted);

export const $isLoadingSourceDetails = createStore<boolean>(false)
  .on(fetchSourceDetailsFx.pending, (_, pending) => pending)
  .reset(pageUnmounted);

// Resources
export const $allResources = createStore<Resource[]>([])
  .on(fetchResourceTreeFx.doneData, (_, resources) => resources)
  .on(fetchSourceDetailsFx.doneData, (_, sourceDetails) => sourceDetails.resources || [])
  .reset(pageUnmounted);

export const $filteredResources = createStore<Resource[]>([])
  .on(resourcesFiltered, (_, resources) => resources)
  .on($allResources, (_, allResources) => allResources);

export const $selectedResource = createStore<Resource | null>(null)
  .on(resourceSelected, (_, resource) => resource)
  .on(resourceDeselected, () => null)
  .reset(pageUnmounted);

export const $isLoadingResources = createStore<boolean>(false)
  .on(fetchResourceTreeFx.pending, (_, pending) => pending)
  .reset(pageUnmounted);

// Search
export const $searchQuery = createStore<string>('')
  .on(searchQueryChanged, (_, query) => query)
  .reset(pageUnmounted);

// Resource preview data
export const $isLoadingData = createStore<boolean>(false)
  .on(fetchResourcePreviewFx.pending, (_, pending) => pending)
  .on(resourceDataLoading, () => true)
  .on([resourceDataLoaded, resourceDataError], () => false)
  .reset(pageUnmounted);

export const $resourceData = createStore<any>(null)
  .on(fetchResourcePreviewFx.doneData, (_, data) => data)
  .on(resourceDataLoaded, (_, data) => data)
  .reset(pageUnmounted);

export const $dataError = createStore<string | null>(null)
  .on(fetchResourcePreviewFx.failData, (_, error) => error.message || 'Failed to load resource data')
  .on(resourceDataError, (_, error) => error)
  .on([fetchResourcePreviewFx.done, resourceDataLoaded], () => null)
  .reset(pageUnmounted);

// Connection validation
export const $connectionValidation = createStore<{ isValid: boolean; message?: string } | null>(null)
  .on(validateSourceConnectionFx.doneData, (_, result) => result)
  .reset(pageUnmounted);

export const $isValidatingConnection = createStore<boolean>(false)
  .on(validateSourceConnectionFx.pending, (_, pending) => pending)
  .reset(pageUnmounted);

// Connection details
export const $connectionDetails = createStore<any>(null)
  .on(fetchConnectionDetailsFx.doneData, (_, details) => details)
  .reset(pageUnmounted);

export const $isLoadingConnectionDetails = createStore<boolean>(false)
  .on(fetchConnectionDetailsFx.pending, (_, pending) => pending)
  .reset(pageUnmounted);

// Table configuration
export const $isTableConfigOpen = createStore<boolean>(false)
  .on(tableConfigOpened, () => true)
  .on(tableConfigClosed, () => false)
  .reset(pageUnmounted);

export const $columnMapping = createStore<any>({})
  .on(columnMappingUpdated, (_, mapping) => mapping)
  .reset(pageUnmounted);

// Global error store for explore page
export const $exploreError = createStore<string | null>(null)
  .on(fetchSourceDetailsFx.failData, (_, error) => error.message || 'Failed to fetch source details')
  .on(fetchResourceTreeFx.failData, (_, error) => error.message || 'Failed to fetch resources')
  .on(fetchConnectionDetailsFx.failData, (_, error) => error.message || 'Failed to fetch connection details')
  .reset([
    fetchSourceDetailsFx.done,
    fetchResourceTreeFx.done,
    fetchConnectionDetailsFx.done,
    pageUnmounted
  ]);