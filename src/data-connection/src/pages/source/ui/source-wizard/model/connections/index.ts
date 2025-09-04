import { sample } from 'effector';
import {
  pageMounted,
  pageUnmounted,
  wizardCompleted,
  connectionDetailsUpdated,
  projectSelected,
  connectionNameUpdated,
} from '../events';
import {
  $selectedProject,
  $connectionName,
  $connectionDetails,
} from '../stores';
import {
  testConnectionFx,
  createSourceFx,
  generateOutputLocationFx,
} from '../effects';

sample({
  clock: wizardCompleted,
  source: {
    sourceType: $selectedProject,
    connectionName: $connectionName,
    connectionDetails: $connectionDetails,
  },
  filter: ({ sourceType }) => Boolean(sourceType),
  fn: ({ sourceType, connectionName, connectionDetails }) => ({
    sourceType: 'postgresql',
    connectionMethod: 'direct' as const,
    connectionName,
    projectId: sourceType?.id || '',
    connectionDetails,
    outputLocation: sourceType?.path || '',
  }),
  target: createSourceFx,
});

// Auto-generate output location when project and connection name are set
sample({
  clock: [projectSelected, connectionNameUpdated],
  source: {
    project: $selectedProject,
    connectionName: $connectionName,
  },
  filter: ({ project, connectionName }) =>
    Boolean(project && connectionName && connectionName !== 'Untitled'),
  fn: ({ project, connectionName }) => ({
    projectPath: project!.path,
    connectionName,
  }),
  target: generateOutputLocationFx,
});
