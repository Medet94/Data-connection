import { Resource } from '#/shared/types';

export interface SourceDetails {
  id: string;
  name: string;
  type: string;
  status: string;
  connectionId: string;
  resources?: Resource[];
  metadata?: any;
}

export interface ResourceData {
  columns: string[];
  rows: any[][];
  totalCount: number;
  hasMore: boolean;
}

export interface ResourcePreviewRequest {
  sourceId: string;
  resourceId: string;
  limit?: number;
  offset?: number;
}
