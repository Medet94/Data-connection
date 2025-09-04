# Data Connection API Integration Plan

*Last updated: January 13, 2025*

This document outlines the step-by-step plan to transfer the Data Connection application from mock data to real API endpoints, based on the comprehensive analysis of the existing codebase and available API documentation.

## 📋 Current Status Assessment

### ✅ Completed Tasks
1. **Codebase Analysis** - Analyzed existing mock data usage across all components
2. **API Endpoint Mapping** - Identified all available endpoints from Swagger documentation
3. **Base API Client Setup** - Enhanced existing API client with comprehensive endpoint functions
4. **Source Page Integration** - Successfully replaced mock data with real API calls for the main source list
5. **Source Wizard Effects** - Completely replaced all mock wizard effects with real API calls
6. **Explore Interface Integration** - Implemented source details, resource tree, and preview with real APIs
7. **Sync Management Integration** - Full CRUD operations for sync management with real API calls

### 🔄 In Progress
- **Testing and Validation** - Validating real API integration and error handling

### ⏳ Pending Tasks
- **Agent Management Integration** - Awaiting API endpoint clarification
- **Performance Optimization** - Caching and pagination improvements
- **Advanced Features** - Table configuration enhancements

## 🗺️ Implementation Roadmap

### Phase 1: Core Data Fetching (COMPLETED ✅)

#### 1.1 API Client Enhancement
**Location:** `src/shared/api/index.ts`
**Status:** ✅ COMPLETED

```typescript
// Enhanced API client with typed responses
export const connectionApi = {
  getAll: () => Promise<ApiListResponse<Connection>>,
  getByProject: (projectId: string) => Promise<ApiListResponse<Connection>>,
  getById: (id: string) => Promise<ApiResponse<Connection>>,
  create: (data: any) => Promise<ApiResponse<Connection>>,
  test: (config: any) => Promise<ApiResponse<TestResult>>,
  // ... additional methods
};
```

#### 1.2 Source Page Integration
**Location:** `src/pages/source/`
**Status:** ✅ COMPLETED

- ✅ Created `fetchConnectionsFx` and `fetchConnectionsByProjectFx` effects
- ✅ Updated stores with `$connections`, `$isLoading`, `$error`
- ✅ Connected page mounting to automatic data fetching
- ✅ Added loading states and error handling in UI
- ✅ Replaced mock data with real API data

### Phase 2: Source Creation Wizard Integration (IN PROGRESS 🔄)

#### 2.1 Wizard Effects Update
**Location:** `src/pages/source-wizard/model/effects/index.ts`
**Priority:** HIGH
**Estimated Time:** 2-3 hours

**Current Mock Effects to Replace:**

1. **Connection Testing Effect**
```typescript
// BEFORE (Mock)
export const testConnectionFx = createEffect(async ({ sourceType, connectionDetails }) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { success: true, previewData: mockData };
});

// AFTER (Real API)
export const testConnectionFx = createEffect(async ({ sourceType, connectionDetails }) => {
  const response = await connectionApi.test({
    type: sourceType,
    config: connectionDetails
  });
  return {
    success: response.success,
    previewData: response.data.previewData,
    message: response.message
  };
});
```

2. **Source Creation Effect**
```typescript
// BEFORE (Mock)
export const createSourceFx = createEffect(async (wizardData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, sourceId: `source-${Date.now()}` };
});

// AFTER (Real API)
export const createSourceFx = createEffect(async (wizardData) => {
  const connectionResponse = await connectionApi.create({
    name: wizardData.connectionName,
    type: wizardData.sourceType,
    connectionMethod: wizardData.connectionMethod,
    projectId: wizardData.projectId,
    config: wizardData.connectionDetails
  });
  
  if (connectionResponse.success) {
    const sourceResponse = await sourceApi.create({
      connectionId: connectionResponse.data.id,
      outputLocation: wizardData.outputLocation
    });
    return {
      success: sourceResponse.success,
      sourceId: sourceResponse.data.id,
      connectionId: connectionResponse.data.id
    };
  }
  throw new Error(connectionResponse.message);
});
```

3. **Output Location Generation Effect**
```typescript
// BEFORE (Mock)
export const generateOutputLocationFx = createEffect(async ({ projectPath, connectionName }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { path: `${projectPath}/${sanitizedName}`, items: mockItems };
});

// AFTER (Real API) - Need to identify the correct endpoint
// QUESTION: What endpoint handles folder generation?
// Options: Project API, File System API, or Connection API?
```

#### 2.2 Required API Clarifications
**Questions for User:**

1. **Folder Generation:** Which API endpoint handles output folder generation?
2. **Project Selection:** How do we fetch available projects for the wizard?
3. **Source Types:** Should we get available source types from `/Connection/connector-types`?
4. **Database Discovery:** When should we call `/Connection/discover-databases`?

### Phase 3: Explore Interface Integration (PENDING ⏳)

#### 3.1 Resource Data Fetching
**Location:** `src/pages/explore/model/effects/index.ts`
**Priority:** MEDIUM
**Estimated Time:** 3-4 hours

**Required New Effects:**
```typescript
// Fetch source details and resources
export const fetchSourceDetailsFx = createEffect<string, SourceDetails>(
  async (sourceId) => {
    const response = await sourceApi.getById(sourceId);
    return response.data;
  }
);

// Fetch resource tree data
export const fetchResourcesFx = createEffect<string, Resource[]>(
  async (sourceId) => {
    // QUESTION: What endpoint provides resource tree data?
    // Is it part of Source API or separate Resources API?
  }
);

// Fetch resource preview data
export const fetchResourcePreviewFx = createEffect<
  { sourceId: string; resourceId: string }, 
  PreviewData
>(async ({ sourceId, resourceId }) => {
  // QUESTION: What endpoint provides data preview?
});
```

#### 3.2 Table Configuration Integration
**Location:** `src/pages/explore/ui/table-details-modal/`
**Priority:** LOW
**Estimated Time:** 2-3 hours

- Column mapping API calls
- Advanced configuration persistence
- Data type validation

### Phase 4: Sync Management Integration (PENDING ⏳)

#### 4.1 Sync Operations
**Location:** `src/pages/sync/model/effects/index.ts`
**Priority:** MEDIUM
**Estimated Time:** 2-3 hours

**Required Effects:**
```typescript
export const fetchSyncsFx = createEffect(async () => {
  const response = await syncApi.getAll();
  return response.data;
});

export const createSyncFx = createEffect(async (syncData) => {
  const response = await syncApi.create(syncData);
  return response.data;
});

export const updateSyncFx = createEffect(async (syncData) => {
  const response = await syncApi.update(syncData);
  return response.data;
});
```

### Phase 5: Agent Management Integration (PENDING ⏳)

#### 5.1 Agent Operations
**Location:** `src/pages/agents/model/effects/index.ts`
**Priority:** LOW
**Estimated Time:** 1-2 hours

**Note:** Swagger documentation doesn't show Agent endpoints. Need clarification on Agent API.

## 🔧 Technical Implementation Details

### API Response Transformation Pattern

All API effects follow this pattern:
```typescript
export const apiEffect = createEffect<InputType, OutputType>({
  name: 'domain/effectName',
  handler: async (input) => {
    try {
      const response = await api.method(input);
      
      if (response.success && response.data) {
        // Transform API response to match internal types
        return transformApiResponse(response.data);
      } else {
        throw new Error(response.message || 'API call failed');
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
});
```

### Error Handling Strategy

1. **Network Errors:** Caught by Axios interceptors
2. **API Errors:** Handled in effect handlers with proper error messages
3. **UI Errors:** Displayed using Alert components with retry functionality
4. **Loading States:** Managed by Effector stores with `.pending` property

### Type Safety Implementation

```typescript
// Define strict types for API responses
interface ConnectionResponse {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  createdAt: string;
  updatedAt: string;
  config: Record<string, any>;
}

// Transform API types to internal types
const transformConnection = (apiConnection: ConnectionResponse): DataConnection => ({
  id: apiConnection.id,
  name: apiConnection.name,
  type: mapApiType(apiConnection.type),
  status: apiConnection.status,
  createdAt: new Date(apiConnection.createdAt),
  lastModified: new Date(apiConnection.updatedAt),
  // ... additional mappings
});
```

## 📝 Required API Clarifications

### High Priority Questions

1. **Project Management:**
   - How to fetch available projects for wizard Step 3?
   - Is there a `/Project` endpoint not shown in Swagger?

2. **Folder Operations:**
   - Which endpoint handles output folder generation in wizard Step 5?
   - How do we create folder structures in Phoenix projects?

3. **Resource Data:**
   - How to fetch resource tree data for Explore interface?
   - What endpoint provides data preview for tables/resources?

4. **Agent Management:**
   - Are there Agent endpoints not documented in the current Swagger?
   - How do we manage agent connections and status?

### Medium Priority Questions

5. **Data Discovery:**
   - When to use `/Connection/discover-databases` endpoint?
   - How does it integrate with the wizard flow?

6. **Source vs Connection:**
   - What's the relationship between Connection and Source entities?
   - Should we create Connection first, then Source?

7. **Authentication:**
   - Are there specific headers or tokens required?
   - How do we handle authentication errors?

## 🧪 Testing Strategy

### Phase 1: Unit Testing
- Test individual API effects with mock responses
- Validate data transformations
- Test error scenarios

### Phase 2: Integration Testing
- Test complete user flows (create connection, explore data, create sync)
- Test error handling and retry mechanisms
- Test loading states and UI responsiveness

### Phase 3: End-to-End Testing
- Test with real API endpoints in development environment
- Validate data consistency across different components
- Test performance with larger datasets

## 📊 Success Metrics

### Technical Metrics
- ✅ All mock data replaced with real API calls
- ✅ Error handling covers all failure scenarios
- ✅ Loading states provide good user experience
- ✅ Data transformations maintain type safety

### User Experience Metrics
- Fast loading times (<2s for connection lists)
- Clear error messages with actionable steps
- Seamless navigation between mock and real data sections
- No breaking changes to existing UI/UX

## 🚀 Next Steps

### Immediate Actions (Next Session)
1. **Complete wizard effects** - Replace remaining mock implementations
2. **Clarify API questions** - Get answers about missing endpoints
3. **Test source page integration** - Verify real API calls work correctly

### Short Term (This Week)
1. **Explore interface integration** - Add resource fetching and preview
2. **Basic sync management** - CRUD operations for syncs
3. **Error handling improvements** - Better user feedback

### Medium Term (Next Sprint)
1. **Agent management integration** - If API endpoints are available
2. **Advanced features** - Table configuration, column mapping
3. **Performance optimization** - Caching, pagination

This plan ensures a systematic, safe migration from mock data to real API integration while maintaining the excellent user experience of the existing Data Connection application.