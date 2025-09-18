import { createEffect } from 'effector';
import {
  connectionApi,
  sourceApi,
  ApiResponse,
} from '../../../../../../shared/api';

interface TestConnectionRequest {
  sourceType: string;
  connectionDetails: Record<string, any>;
}

interface TestConnectionResponse {
  success: boolean;
  message?: string;
  previewData?: {
    tables?: string[];
    schemas?: string[];
    databases?: string[];
    resources?: any[];
  };
}

interface CreateSourceRequest {
  sourceType: string;
  connectionMethod: 'direct' | 'agent';
  connectionName: string;
  projectId: string;
  connectionDetails: Record<string, any>;
  outputLocation: string;
}

interface CreateSourceResponse {
  success: boolean;
  sourceId?: string;
  connectionId?: string;
  message?: string;
}

interface GenerateOutputLocationRequest {
  projectPath: string;
  connectionName: string;
}

interface GenerateOutputLocationResponse {
  path: string;
  items: Array<{
    name: string;
    type: 'folder' | 'file';
    status: 'existing' | 'new';
  }>;
}

// Effect for testing connection
export const testConnectionFx = createEffect<
  TestConnectionRequest,
  TestConnectionResponse
>({
  name: 'wizard/testConnectionFx',
  handler: async ({ sourceType, connectionDetails }) => {
    try {
      const response: ApiResponse<any> = await connectionApi.test({
        type: sourceType,
        config: connectionDetails,
      });

      if (response.success) {
        return {
          success: true,
          message: response.message || 'Connection successful',
          previewData: {
            tables: response.data?.tables || [],
            schemas: response.data?.schemas || [],
            databases: response.data?.databases || [],
            resources: response.data?.resources || [],
          },
        };
      } else {
        return {
          success: false,
          message: response.message || 'Connection test failed',
        };
      }
    } catch (error: any) {
      console.error('Connection test failed:', error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          'Connection test failed',
      };
    }
  },
});

// Effect for creating source
export const createSourceFx = createEffect<
  CreateSourceRequest,
  CreateSourceResponse
>({
  name: 'wizard/createSourceFx',
  handler: async (wizardData) => {
    try {
      // Step 1: Create the connection
      const connectionResponse: ApiResponse<any> = await connectionApi.create({
        name: wizardData.connectionName,
        type: wizardData.sourceType,
        connectionMethod: wizardData.connectionMethod,
        projectId: wizardData.projectId,
        config: wizardData.connectionDetails,
      });

      if (!connectionResponse.success) {
        throw new Error(
          connectionResponse.message || 'Failed to create connection'
        );
      }

      // Step 2: Create the source
      const sourceResponse: ApiResponse<any> = await sourceApi.create({
        connectionId: connectionResponse.data.id,
        name: wizardData.connectionName,
        outputLocation: wizardData.outputLocation,
      });

      if (!sourceResponse.success) {
        throw new Error(sourceResponse.message || 'Failed to create source');
      }

      return {
        success: true,
        sourceId: sourceResponse.data.id,
        connectionId: connectionResponse.data.id,
        message: 'Source created successfully',
      };
    } catch (error: any) {
      console.error('Source creation failed:', error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          'Failed to create source',
      };
    }
  },
});

// Effect for generating output location
// Note: This is a placeholder implementation since the exact API endpoint is unclear
// TODO: Replace with actual API call when the correct endpoint is identified
export const generateOutputLocationFx = createEffect<
  GenerateOutputLocationRequest,
  GenerateOutputLocationResponse
>({
  name: 'wizard/generateOutputLocationFx',
  handler: async ({ projectPath, connectionName }) => {
    try {
      // TODO: Replace this with actual API call to project/folder management endpoint
      // For now, keeping the mock logic but with proper error handling

      const sanitizedName = connectionName.replace(/[^a-zA-Z0-9-_]/g, '_');
      const outputPath = `${projectPath}/${sanitizedName}`;

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        path: outputPath,
        items: [
          { name: sanitizedName, type: 'folder', status: 'new' },
          { name: 'raw_data', type: 'folder', status: 'new' },
          { name: 'processed_data', type: 'folder', status: 'new' },
          { name: 'config.json', type: 'file', status: 'new' },
        ],
      };
    } catch (error: any) {
      console.error('Output location generation failed:', error);
      throw new Error('Failed to generate output location structure');
    }
  },
});

// Effect for discovering databases (for connection testing and preview)
export const discoverDatabasesFx = createEffect<
  { sourceType: string; connectionDetails: Record<string, any> },
  { databases: string[]; schemas: string[]; tables: string[] }
>({
  name: 'wizard/discoverDatabasesFx',
  handler: async ({ sourceType, connectionDetails }) => {
    try {
      const response: ApiResponse<any> = await connectionApi.discoverDatabases({
        type: sourceType,
        config: connectionDetails,
      });

      if (response.success) {
        return {
          databases: response.data?.databases || [],
          schemas: response.data?.schemas || [],
          tables: response.data?.tables || [],
        };
      } else {
        throw new Error(response.message || 'Failed to discover databases');
      }
    } catch (error: any) {
      console.error('Database discovery failed:', error);
      throw error;
    }
  },
});

// Effect for fetching available connector types
export const fetchConnectorTypesFx = createEffect<void, any[]>({
  name: 'wizard/fetchConnectorTypesFx',
  handler: async () => {
    try {
      const response = await connectionApi.getConnectorTypes();

      if (response.success) {
        return response.data || [];
      } else {
        throw new Error(response.message || 'Failed to fetch connector types');
      }
    } catch (error: any) {
      console.error('Failed to fetch connector types:', error);
      throw error;
    }
  },
});
