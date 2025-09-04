import { createStore } from 'effector';
import {
  pageMounted,
  pageUnmounted,
  stageChanged,
  sourceTypeSelected,
  connectionMethodSelected,
  connectionNameUpdated,
  projectSelected,
  connectionDetailsUpdated,
  outputLocationSelected,
  wizardReset,
  loadingStarted,
  loadingFinished,
  validationFailed,
  validationPassed,
  connectionTestStarted,
  connectionTestSuccess,
  connectionTestFailed,
} from '../events';
import {
  testConnectionFx,
  createSourceFx,
  generateOutputLocationFx,
  discoverDatabasesFx,
  fetchConnectorTypesFx,
} from '../effects';
import {
  SourceType,
  ConnectionMethod,
  ProjectReference,
  SourceConfig,
  WizardData,
} from '#/shared/types';

// Page state
export const $isPageMounted = createStore(false)
  .on(pageMounted, () => true)
  .on(pageUnmounted, () => false);

export const $currentStage = createStore(1)
  .on(stageChanged, (_, stage) => stage)
  .reset(wizardReset);

export const $wizardData = createStore<WizardData>({
  currentStage: 1,
  sourceType: undefined,
  connectionMethod: undefined,
  sourceName: 'Untitled',
  project: undefined,
  connectionConfig: {},
  outputFolder: undefined,
})
  .on(stageChanged, (state, stage) => ({ ...state, currentStage: stage }))
  .on(sourceTypeSelected, (state, sourceType) => ({ ...state, sourceType }))
  .on(connectionMethodSelected, (state, connectionMethod) => ({
    ...state,
    connectionMethod,
  }))
  .on(connectionNameUpdated, (state, sourceName) => ({
    ...state,
    sourceName: sourceName || 'Untitled',
  }))
  .on(projectSelected, (state, project) => ({ ...state, project }))
  .on(connectionDetailsUpdated, (state, details) => ({
    ...state,
    connectionConfig: { ...state.connectionConfig, ...details },
  }))
  .on(outputLocationSelected, (state, outputFolder) => ({
    ...state,
    outputFolder,
  }))
  .reset(wizardReset);

// Loading states
export const $isLoading = createStore<boolean>(false)
  .on(loadingStarted, () => true)
  .on(loadingFinished, () => false)
  .on(connectionTestStarted, () => true)
  .on([connectionTestSuccess, connectionTestFailed], () => false)
  .reset(wizardReset);

export const $loadingMessage = createStore<string>('Loading...')
  .on(loadingStarted, (_, message) => message)
  .on(connectionTestStarted, () => 'Testing connection...')
  .reset(wizardReset);

// Validation states
export const $validationErrors = createStore<Record<string, string>>({})
  .on(validationFailed, (_, errors) => errors)
  .on(validationPassed, () => ({}))
  .reset(wizardReset);

export const $isStageValid = createStore<boolean>(true)
  .on(validationFailed, () => false)
  .on(validationPassed, () => true)
  .reset(wizardReset);

// Connection test states
export const $connectionTestResult = createStore<{
  success: boolean;
  error?: string;
  previewData?: any;
} | null>(null)
  .on(testConnectionFx.doneData, (_, result) => ({
    success: result.success,
    error: result.success ? undefined : result.message,
    previewData: result.previewData,
  }))
  .on(testConnectionFx.failData, (_, error) => ({
    success: false,
    error: error.message || 'Connection test failed',
  }))
  .on(connectionTestSuccess, () => ({ success: true }))
  .on(connectionTestFailed, (_, error) => ({ success: false, error }))
  .reset(wizardReset);

// Connection test loading state
export const $isTestingConnection = createStore<boolean>(false)
  .on(testConnectionFx.pending, (_, pending) => pending)
  .reset(wizardReset);

// Preview data from connection test
export const $previewData = createStore<any>(null)
  .on(testConnectionFx.doneData, (_, result) => result.previewData)
  .on(discoverDatabasesFx.doneData, (_, data) => data)
  .reset(wizardReset);

// Source creation states
export const $isCreatingSource = createStore<boolean>(false)
  .on(createSourceFx.pending, (_, pending) => pending)
  .reset(wizardReset);

export const $sourceCreationResult = createStore<{
  success: boolean;
  sourceId?: string;
  message?: string;
} | null>(null)
  .on(createSourceFx.doneData, (_, result) => result)
  .on(createSourceFx.failData, (_, error) => ({
    success: false,
    message: error.message || 'Failed to create source',
  }))
  .reset(wizardReset);

// Output location generation states
export const $isGeneratingOutput = createStore<boolean>(false)
  .on(generateOutputLocationFx.pending, (_, pending) => pending)
  .reset(wizardReset);

export const $outputGenerationResult = createStore<{
  path: string;
  items: any[];
} | null>(null)
  .on(generateOutputLocationFx.doneData, (_, result) => result)
  .reset(wizardReset);

// Available connector types
export const $connectorTypes = createStore<any[]>([])
  .on(fetchConnectorTypesFx.doneData, (_, types) => types)
  .reset(wizardReset);

export const $isLoadingConnectorTypes = createStore<boolean>(false)
  .on(fetchConnectorTypesFx.pending, (_, pending) => pending)
  .reset(wizardReset);

// Global error store for wizard
export const $wizardError = createStore<string | null>(null)
  .on(
    testConnectionFx.failData,
    (_, error) => error.message || 'Connection test failed'
  )
  .on(
    createSourceFx.failData,
    (_, error) => error.message || 'Failed to create source'
  )
  .on(
    generateOutputLocationFx.failData,
    (_, error) => error.message || 'Failed to generate output location'
  )
  .on(
    discoverDatabasesFx.failData,
    (_, error) => error.message || 'Failed to discover databases'
  )
  .on(
    fetchConnectorTypesFx.failData,
    (_, error) => error.message || 'Failed to fetch connector types'
  )
  .reset([
    testConnectionFx.done,
    createSourceFx.done,
    generateOutputLocationFx.done,
    discoverDatabasesFx.done,
    fetchConnectorTypesFx.done,
    wizardReset,
  ]);
