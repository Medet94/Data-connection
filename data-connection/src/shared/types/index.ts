// Source Types
export type SourceType =
  | 'postgresql'
  | 'mysql'
  | 'microsoft-sql-server-odbc'
  | 'sas'
  | 'spss'
  | 'merge-access'
  | 'merge-excel'
  | 'microsoft-access'
  | 'apache-doris'
  | 'netezza'
  | 'vertica'
  | 'spotlight-bda';

export type ConnectionMethod = 'direct' | 'agent';

export type TransactionType = 'snapshot' | 'append' | 'update';

export type ScheduleType = 'manual' | 'hourly' | 'daily' | 'weekly';

export interface DataConnection {
  id: string;
  name: string;
  type: ConnectionType;
  // status: ConnectionStatus;
  // namespace: string;
  // creator: string;
  createdAt: Date;
  // lastModified: Date;
  // lastSync?: Date;
  // syncFrequency?: SyncFrequency;
  description?: string | null;
  config?: ConnectionConfig;
  createdBy?: string;
  folderId?: string;
  isActive?: boolean;
  projectId?: string;
  rid?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export interface ConnectionConfig {
  server: string;
  user: string;
  password: string;
  port?: string;
  database?: string;
  // host?: string;
  // username?: string;
  // ssl?: boolean;
  // filePath?: string;
  // fileSize?: number;
  // schema?: Record<string, any>;
}

export interface ConnectionMetrics {
  totalConnections: number;
  activeConnections: number;
  recentActivity: number;
  syncErrors: number;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

// New interfaces for the complete app

export interface Source {
  id: string;
  name: string;
  sourceType: SourceType;
  connectionMethod: ConnectionMethod;
  status: ConnectionStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  project: ProjectReference;
  defaultOutputFolder: string;
  config: SourceConfig;
}

export interface SourceConfig {
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  ssl?: boolean;
  filePath?: string;
  agentId?: string;
}

export interface ProjectReference {
  id: string;
  name: string;
  namespace: string;
  path: string;
}

// export interface Sync {
//   id: string;
//   name: string;
//   sourceId: string;
//   resourceId: string;
//   schedule: ScheduleType;
//   transactionType: TransactionType;
//   status: ConnectionStatus;
//   lastRun?: Date;
//   nextRun?: Date;
//   outputFolder: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface Agent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'error';
  version: string;
  lastSeen: Date;
  capabilities: string[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'table' | 'view' | 'file';
  schema?: string;
  rowCount?: number;
  columnCount?: number;
  size?: string;
  lastUpdated?: Date;
}

export interface Column {
  name: string;
  sourceType: string;
  destinationType: string;
  nullable: boolean;
  selected: boolean;
  destinationName?: string;
}

export interface WizardData {
  sourceType?: SourceType;
  connectionMethod?: ConnectionMethod;
  sourceName?: string;
  project?: ProjectReference;
  connectionConfig?: SourceConfig;
  outputFolder?: string;
  currentStage: number;
}

// API Response Types for Connector Types
export interface ConnectorType {
  type: string;
  name: string;
  description: string;
  icon: string;
  group: string;
  isAvailable: boolean;
}

export interface ConnectorGroup {
  name: string;
  description: string;
  count: number;
}

export interface ConnectorTypesData {
  connectors: ConnectorType[];
  groups: ConnectorGroup[];
}

export interface ConnectorTypesResponse {
  status: string;
  data: ConnectorTypesData;
  message: string | null;
  timestamp: string;
}

// API Response Types for Connector Parameters
export interface ConnectorParameterOption {
  value: string;
  label: string;
}

export interface ConnectorParameter {
  name: string;
  type: 'string' | 'integer' | 'password' | 'select' | 'boolean';
  required: boolean;
  defaultValue: string | number | boolean | null;
  description: string;
  isSecure: boolean | null;
  options: ConnectorParameterOption[] | null;
}

export interface ConnectorParametersData {
  type: string;
  parameters: ConnectorParameter[];
}

export interface ConnectorParametersResponse {
  status: string;
  data: ConnectorParametersData;
  message: string;
  timestamp: string;
}
