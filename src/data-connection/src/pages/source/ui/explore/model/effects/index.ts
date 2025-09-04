import { createEffect } from 'effector';
import { sourceApi, connectionApi, ApiResponse } from '#/shared/api';
import { Resource } from '#/shared/types';
import { SourceDetails, ResourceData, ResourcePreviewRequest } from '../types';

// Effect to fetch source details and resources
export const fetchSourceDetailsFx = createEffect<string, SourceDetails>({
  name: 'explore/fetchSourceDetailsFx',
  handler: async (sourceId: string) => {
    try {
      const response: ApiResponse<any> = await sourceApi.getById(sourceId);

      if (response.success && response.data) {
        return {
          id: response.data.id,
          name: response.data.name,
          type: response.data.type,
          status: response.data.status,
          connectionId: response.data.connectionId,
          resources: response.data.resources || [],
          metadata: response.data.metadata || {},
        };
      } else {
        throw new Error(response.message || 'Failed to fetch source details');
      }
    } catch (error: any) {
      console.error('Failed to fetch source details:', error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch source details'
      );
    }
  },
});

export const fetchResourceTreeFx = createEffect<string, Resource[]>({
  name: 'explore/fetchResourceTreeFx',
  handler: async (sourceId: string) => {
    try {
      const response: ApiResponse<any> = await sourceApi.getById(sourceId);

      if (response.success && response.data?.resources) {
        return response.data.resources.map((resource: any) => ({
          id: resource.id,
          name: resource.name,
          type: resource.type || 'table',
          schema: resource.schema || 'public',
          rowCount: resource.rowCount || 0,
          columnCount: resource.columnCount || 0,
          size: resource.size || '0 MB',
          lastUpdated: resource.lastUpdated
            ? new Date(resource.lastUpdated)
            : new Date(),
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch resource tree');
      }
    } catch (error: any) {
      console.error('Failed to fetch resource tree:', error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch resource tree'
      );
    }
  },
});

export const fetchResourcePreviewFx = createEffect<
  ResourcePreviewRequest,
  ResourceData
>({
  name: 'explore/fetchResourcePreviewFx',
  handler: async ({ sourceId, resourceId, limit = 100, offset = 0 }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData: ResourceData = {
        columns: ['id', 'name', 'email', 'amount', 'created_at'],
        rows: [
          [1, 'John Doe', 'john@example.com', 99.5, '2024-01-15 10:30:00'],
          [2, 'Jane Smith', 'jane@example.com', 150.0, '2024-01-15 11:45:00'],
          [3, 'Bob Wilson', 'bob@example.com', 75.25, '2024-01-15 14:20:00'],
          [4, 'Alice Brown', 'alice@example.com', 200.0, '2024-01-16 09:15:00'],
          [5, 'Mike Chen', 'mike@example.com', 125.75, '2024-01-16 16:30:00'],
        ],
        totalCount: 1245678,
        hasMore: true,
      };

      return mockData;
    } catch (error: any) {
      console.error('Failed to fetch resource preview:', error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch resource preview'
      );
    }
  },
});

// Effect to validate source connection
export const validateSourceConnectionFx = createEffect<
  string,
  { isValid: boolean; message?: string }
>({
  name: 'explore/validateSourceConnectionFx',
  handler: async (sourceId: string) => {
    try {
      const response: ApiResponse<any> = await sourceApi.validate(sourceId);

      if (response.success) {
        return {
          isValid: response.data?.isValid || true,
          message: response.message || 'Source connection is valid',
        };
      } else {
        return {
          isValid: false,
          message: response.message || 'Source connection validation failed',
        };
      }
    } catch (error: any) {
      console.error('Failed to validate source connection:', error);
      return {
        isValid: false,
        message:
          error.response?.data?.message ||
          error.message ||
          'Connection validation failed',
      };
    }
  },
});

// Effect to fetch connection details for a source
export const fetchConnectionDetailsFx = createEffect<string, any>({
  name: 'explore/fetchConnectionDetailsFx',
  handler: async (connectionId: string) => {
    try {
      const response: ApiResponse<any> =
        await connectionApi.getById(connectionId);

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(
          response.message || 'Failed to fetch connection details'
        );
      }
    } catch (error: any) {
      console.error('Failed to fetch connection details:', error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch connection details'
      );
    }
  },
});
