import { createEffect } from 'effector';
import { syncApi, ApiResponse, ApiListResponse } from '../../../../shared/api';
import { Sync, CreateSyncRequest, UpdateSyncRequest } from '../types';

export const fetchSyncsFx = createEffect<void, Sync[]>({
  name: 'sync/fetchSyncsFx',
  handler: async () => {
    try {
      const response: ApiListResponse<any> = await syncApi.getAll();

      if (response.success && response.data) {
        return response.data.map((sync: any) => ({
          id: sync.id,
          name: sync.name,
          sourceId: sync.sourceId,
          resourceId: sync.resourceId,
          schedule: sync.schedule || 'manual',
          transactionType: sync.transactionType || 'snapshot',
          status: sync.status || 'inactive',
          lastRun: sync.lastRun ? new Date(sync.lastRun) : undefined,
          nextRun: sync.nextRun ? new Date(sync.nextRun) : undefined,
          outputFolder: sync.outputFolder || '',
          createdAt: sync.createdAt ? new Date(sync.createdAt) : new Date(),
          updatedAt: sync.updatedAt ? new Date(sync.updatedAt) : new Date(),
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch syncs');
      }
    } catch (error: any) {
      console.error('Failed to fetch syncs:', error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch syncs'
      );
    }
  },
});

export const fetchSyncByIdFx = createEffect<string, Sync>({
  name: 'sync/fetchSyncByIdFx',
  handler: async (syncId: string) => {
    try {
      const response: ApiResponse<any> = await syncApi.getById(syncId);

      if (response.success && response.data) {
        const sync = response.data;
        return {
          id: sync.id,
          name: sync.name,
          sourceId: sync.sourceId,
          resourceId: sync.resourceId,
          schedule: sync.schedule || 'manual',
          transactionType: sync.transactionType || 'snapshot',
          status: sync.status || 'inactive',
          lastRun: sync.lastRun ? new Date(sync.lastRun) : undefined,
          nextRun: sync.nextRun ? new Date(sync.nextRun) : undefined,
          outputFolder: sync.outputFolder || '',
          createdAt: sync.createdAt ? new Date(sync.createdAt) : new Date(),
          updatedAt: sync.updatedAt ? new Date(sync.updatedAt) : new Date(),
        };
      } else {
        throw new Error(response.message || 'Failed to fetch sync');
      }
    } catch (error: any) {
      console.error('Failed to fetch sync:', error);
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to fetch sync'
      );
    }
  },
});

export const createSyncFx = createEffect<CreateSyncRequest, Sync>({
  name: 'sync/createSyncFx',
  handler: async (syncData) => {
    try {
      const response: ApiResponse<any> = await syncApi.create({
        name: syncData.name,
        sourceId: syncData.sourceId,
        resourceId: syncData.resourceId,
        schedule: syncData.schedule,
        transactionType: syncData.transactionType,
        outputFolder: syncData.outputFolder,
        config: syncData.config || {},
      });

      if (response.success && response.data) {
        const sync = response.data;
        return {
          id: sync.id,
          name: sync.name,
          sourceId: sync.sourceId,
          resourceId: sync.resourceId,
          schedule: sync.schedule || 'manual',
          transactionType: sync.transactionType || 'snapshot',
          status: sync.status || 'inactive',
          lastRun: sync.lastRun ? new Date(sync.lastRun) : undefined,
          nextRun: sync.nextRun ? new Date(sync.nextRun) : undefined,
          outputFolder: sync.outputFolder || '',
          createdAt: sync.createdAt ? new Date(sync.createdAt) : new Date(),
          updatedAt: sync.updatedAt ? new Date(sync.updatedAt) : new Date(),
        };
      } else {
        throw new Error(response.message || 'Failed to create sync');
      }
    } catch (error: any) {
      console.error('Failed to create sync:', error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to create sync'
      );
    }
  },
});

export const updateSyncFx = createEffect<UpdateSyncRequest, Sync>({
  name: 'sync/updateSyncFx',
  handler: async (syncData) => {
    try {
      const response: ApiResponse<any> = await syncApi.update({
        id: syncData.id,
        name: syncData.name,
        schedule: syncData.schedule,
        transactionType: syncData.transactionType,
        outputFolder: syncData.outputFolder,
        config: syncData.config || {},
      });

      if (response.success && response.data) {
        const sync = response.data;
        return {
          id: sync.id,
          name: sync.name,
          sourceId: sync.sourceId,
          resourceId: sync.resourceId,
          schedule: sync.schedule || 'manual',
          transactionType: sync.transactionType || 'snapshot',
          status: sync.status || 'inactive',
          lastRun: sync.lastRun ? new Date(sync.lastRun) : undefined,
          nextRun: sync.nextRun ? new Date(sync.nextRun) : undefined,
          outputFolder: sync.outputFolder || '',
          createdAt: sync.createdAt ? new Date(sync.createdAt) : new Date(),
          updatedAt: sync.updatedAt ? new Date(sync.updatedAt) : new Date(),
        };
      } else {
        throw new Error(response.message || 'Failed to update sync');
      }
    } catch (error: any) {
      console.error('Failed to update sync:', error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update sync'
      );
    }
  },
});

export const loadPageDataFx = createEffect<void, void>({
  name: 'sync/loadPageDataFx',
  handler: async () => {},
});
