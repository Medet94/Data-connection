import axios from 'axios';
import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from '../../../../../shared/api/src/interceptors';

export const dataConnectionApi = axios.create({
  baseURL: 'https://phoenix-dev.datamicron.com/api/data-loader-bff',
});

dataConnectionApi.interceptors.request.use(
  requestInterceptor,
  errorInterceptor
);
dataConnectionApi.interceptors.response.use(
  responseInterceptor,
  errorInterceptor
);

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiListResponse<T> {
  data: T[];
  success: boolean;
  message?: string;
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
}

export const connectionApi = {
  getByProject: async (projectId: string): Promise<ApiListResponse<any>> => {
    const response = await dataConnectionApi.get(
      `/Connection/project/${projectId}`
    );
    return response.data;
  },

  getAll: async (): Promise<ApiListResponse<any>> => {
    const response = await dataConnectionApi.get('/api/v1/Connection/search');
    return response.data;
  },

  // Get specific connection by ID
  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.get(`/api/v1/Connection/${id}`);
    return response.data;
  },

  // Create new connection
  create: async (connectionData: any): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.post(
      '/api/v1/Connection',
      connectionData
    );
    return response.data;
  },

  // Update existing connection
  update: async (connectionData: any): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.put('/Connection', connectionData);
    return response.data;
  },

  // Delete connection
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.delete(`/Connection/${id}`);
    return response.data;
  },

  // Test connection
  test: async (connectionConfig: any): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.post(
      '/Connection/test',
      connectionConfig
    );
    return response.data;
  },

  // Get available connector types
  getConnectorTypes: async (): Promise<ApiListResponse<any>> => {
    const response = await dataConnectionApi.get(
      '/api/v1/Connection/connector-types'
    );
    return response.data;
  },

  // Discover databases for connection
  discoverDatabases: async (connectionData: any): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.post(
      '/api/v1/Connection/discover-databases',
      connectionData
    );
    return response.data;
  },
};

export const sourceApi = {
  // Get all sources
  getAll: async (): Promise<ApiListResponse<any>> => {
    const response = await dataConnectionApi.get('/Source');
    return response.data;
  },

  // Get specific source by ID
  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.get(`/Source/${id}`);
    return response.data;
  },

  // Get sources for a specific connection
  getByConnection: async (
    connectionId: string
  ): Promise<ApiListResponse<any>> => {
    const response = await dataConnectionApi.get(
      `/Source/connection/${connectionId}`
    );
    return response.data;
  },

  // Create new source
  create: async (sourceData: any): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.post('/Source', sourceData);
    return response.data;
  },

  // Update existing source
  update: async (sourceData: any): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.put('/Source', sourceData);
    return response.data;
  },

  // Delete source
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.delete(`/Source/${id}`);
    return response.data;
  },

  // Validate source
  validate: async (id: string): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.post(`/Source/${id}/validate`);
    return response.data;
  },
};

export const syncApi = {
  // Get all syncs
  getAll: async (): Promise<ApiListResponse<any>> => {
    const response = await dataConnectionApi.get('/Sync');
    return response.data;
  },

  // Get specific sync by ID
  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.get(`/Sync/${id}`);
    return response.data;
  },

  // Create new sync
  create: async (syncData: any): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.post('/Sync', syncData);
    return response.data;
  },

  // Update existing sync
  update: async (syncData: any): Promise<ApiResponse<any>> => {
    const response = await dataConnectionApi.put('/Sync', syncData);
    return response.data;
  },
};
