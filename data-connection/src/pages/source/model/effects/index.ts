import { createEffect } from 'effector';
import { fetchConnectionsRequest } from '../connections';

// import { connectionApi, ApiListResponse } from '../../../../shared/api';
// import { DataConnection } from '../../../../shared/types';

// export const fetchConnectionsFx = createEffect<void, DataConnection[]>({
//   name: 'source/fetchConnectionsFx',
//   handler: async () => {
//     try {
//       const response: ApiListResponse<any> = await connectionApi.getAll();

//       if (response.success && response.data) {
//         return response.data.map((connection: any) => ({
//           id: connection.id,
//           name: connection.name,
//           type: connection.type || 'external',
//           status: connection.status || 'active',
//           namespace: connection.projectPath || connection.namespace || '',
//           creator: connection.createdBy || 'Unknown',
//           createdAt: connection.createdAt
//             ? new Date(connection.createdAt)
//             : new Date(),
//           lastModified: connection.updatedAt
//             ? new Date(connection.updatedAt)
//             : new Date(),
//           lastSync: connection.lastSyncAt
//             ? new Date(connection.lastSyncAt)
//             : undefined,
//           syncFrequency: connection.syncFrequency,
//           description: connection.description || '',
//           config: connection.config || {},
//         }));
//       } else {
//         throw new Error(response.message || 'Failed to fetch connections');
//       }
//     } catch (error) {
//       console.error('Failed to fetch connections:', error);
//       throw error;
//     }
//   },
// });

// export const fetchConnectionsByProjectFx = createEffect<
//   string,
//   DataConnection[]
// >({
//   name: 'source/fetchConnectionsByProjectFx',
//   handler: async (projectId: string) => {
//     try {
//       const response: ApiListResponse<any> =
//         await connectionApi.getByProject(projectId);

//       if (response.success && response.data) {
//         return response.data.map((connection: any) => ({
//           id: connection.id,
//           name: connection.name,
//           type: connection.type || 'external',
//           status: connection.status || 'active',
//           namespace: connection.projectPath || connection.namespace || '',
//           creator: connection.createdBy || 'Unknown',
//           createdAt: connection.createdAt
//             ? new Date(connection.createdAt)
//             : new Date(),
//           lastModified: connection.updatedAt
//             ? new Date(connection.updatedAt)
//             : new Date(),
//           lastSync: connection.lastSyncAt
//             ? new Date(connection.lastSyncAt)
//             : undefined,
//           syncFrequency: connection.syncFrequency,
//           description: connection.description || '',
//           config: connection.config || {},
//         }));
//       } else {
//         throw new Error(response.message || 'Failed to fetch connections');
//       }
//     } catch (error) {
//       console.error('Failed to fetch connections by project:', error);
//       throw error;
//     }
//   },
// });

export const getConnectionsFx = createEffect(async () => {
  const result = await fetchConnectionsRequest();

  return result.data.items || [];
});
