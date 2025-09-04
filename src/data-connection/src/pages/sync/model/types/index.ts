export interface Sync {
  id: string;
  name: string;
  sourceId: string;
  resourceId: string;
  schedule: string;
  transactionType: 'snapshot' | 'append' | 'update';
  status: string;
  lastRun?: Date;
  nextRun?: Date;
  outputFolder: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSyncRequest {
  name: string;
  sourceId: string;
  resourceId: string;
  schedule: string;
  transactionType: 'snapshot' | 'append' | 'update';
  outputFolder: string;
  config?: Record<string, any>;
}

export interface UpdateSyncRequest {
  id: string;
  name?: string;
  schedule?: string;
  transactionType?: 'snapshot' | 'append' | 'update';
  outputFolder?: string;
  config?: Record<string, any>;
}
