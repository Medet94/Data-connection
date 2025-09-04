# Data Connection UI Components - Text Format Conversion

_Last updated: July 22, 2025_

Based on the screenshots and visual descriptions from `user-guideline.md`, here's a comprehensive list of all UI components converted to text format for implementation reference.

## 🧭 Navigation Index

### Main Screens & Flows
- [Data Connection Home Screen](#home-screen) - `/source` - Main landing page with navigation tabs
- [Source Type Selection](#source-type-selection) - `/new-connection` - Grid of available source types
- [6-Stage Connection Wizard](#stage-1-overview) - `/new-connection/:sourceType/:stage` - Complete connection creation flow
  - [Stage 1: Overview](#stage-1-overview) - `/new-connection/:sourceType/1` - Introduction and requirements
  - [Stage 2: Method Selection](#stage-2-method) - `/new-connection/:sourceType/2` - Direct vs Agent connection
  - [Stage 3: Name & Location](#stage-3-name) - `/new-connection/:sourceType/3` - Source naming and project selection
  - [Stage 4: Connection Details](#stage-4-details) - `/new-connection/:sourceType/4` - Connection parameters and testing
  - [Stage 5: Output Location](#stage-5-output) - `/new-connection/:sourceType/5` - Folder structure generation
  - [Stage 6: Summary](#stage-6-summary) - `/new-connection/:sourceType/6` - Final review and completion

### Data Management Interfaces
- [Explore Interface](#explore-interface) - `/source/explore/:sourceId` - Data browsing and resource exploration
- [Table Details Panel](#table-details-panel) - Modal overlay - Column mapping and advanced settings
- [Source Details Overview](#source-details-overview) - `/source/details/:sourceId` - Source management and status

### Sync Management
- [Multi-Resource Sync Creation](#sync-creation-multi) - `/source/sync/create/multi` *(planned)* - Batch sync configuration
- [Single Resource Sync Creation](#sync-creation-single) - `/source/sync/create/:resourceId` *(planned)* - Individual sync setup
- [Edit Syncs Tab](#edit-syncs-tab) - `/source/details/:sourceId/syncs` *(planned)* - Sync management interface
- [Edit Single Sync](#edit-single-sync) - `/source/sync/edit/:syncId` *(planned)* - Individual sync editing

### Settings & Configuration
- [Connection Settings Tab](#connection-settings-tab) - `/source/details/:sourceId/settings` *(planned)* - Source configuration management

### Component Reference
- [Complete Component List](#component-summary) - All components organized by category
- [Implementation Notes](#implementation-notes) - Visual hierarchy and interaction patterns

---

## 1. Data Connection Home Screen {#home-screen} [Figma node ID: 11415:21880]

**Route:** `/source`  
**Component:** `HomePage`  
**Navigation:** Main tab navigation with count indicators  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Data connection                                     │
├─────────────────────────────────────────────────────┤
│ [Sources] [Syncs] [Agents]           [New Source] │
├─────────────────────────────────────────────────────┤
│ Data Connection                                     │
│ Synchronize and manage data flows between Phoenix   │
│ and external systems                                │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Set Up New Connections                              │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│ │ Data        │ │ Cloud       │ │ File        │    │
│ │ connection. │ │ Services    │ │ Sources     │    │
│ │             │ │             │ │             │    │
│ │ Synchronize │ │             │ │             │    │
│ │ and manage  │ │             │ │             │    │
│ │ data flows  │ │             │ │             │    │
│ │ between     │ │             │ │             │    │
│ │ Phoenix and │ │             │ │             │    │
│ │ external    │ │             │ │             │    │
│ │ systems.    │ │             │ │             │    │
│ └─────────────┘ └─────────────┘ └─────────────┘    │
│                                                     │
│ Recent Sources                                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Files            │ Creator   │ Last edited by│Last viewed│ │
│ ├──────────────────┼───────────┼───────────────┼───────────┤ │
│ │ [🗃] Customer DB  │ John Doe  │ Jane Smith    │ 2h ago    │ │
│ │     PostgreSQL   │           │               │           │ │
│ │ [☁] Sales Data   │ Bob Wilson│ Alice Brown   │ 5h ago    │ │
│ │     Amazon S3    │           │               │           │ │
│ │ [📊] Analytics   │ Mike Chen │ Sarah Davis   │ 1d ago    │ │
│ │     Snowflake    │           │               │           │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Components:

- **PageHeader** {#page-header} with title and description
- **TabNavigation** {#tab-navigation} with count indicators
- **NewSourceButton** {#new-source-button} (green, prominent)
- **QuickSetupCards** {#quick-setup-cards} (3 categories)
- **RecentSourcesList** {#recent-sources-list} with proper column headers and data

## 2. Source Type Selection {#source-type-selection} [Figma node ID: 11415:22299]

**Route:** `/new-connection`  
**Component:** `SourceTypeSelector`  
**Navigation:** Accessible from "New Source" button or Quick Setup cards  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ New Connection                                      │
├─────────────────────────────────────────────────────┤
│ [Search box for source types...]                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │[PG] │ │[MG] │ │[MY] │ │[OR] │ │[SF] │ │[RD] │    │
│ │Post-│ │Mongo│ │MySQL│ │Oracl│ │Snow-│ │Redis│    │
│ │greSQL│ │DB   │ │     │ │e    │ │flake│ │     │    │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    │
│                                                     │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │[S3] │ │[GC] │ │[CSV]│ │[API]│ │[SF] │ │[KF] │    │
│ │Amazn│ │Googl│ │CSV  │ │REST │ │Sales│ │Kafka│    │
│ │S3   │ │Cloud│ │Files│ │API  │ │force│ │     │    │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    │
│                                                     │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                    │
│ │[GA] │ │[HB] │ │[WD] │ │[MS] │                    │
│ │Googl│ │Hub  │ │Work-│ │MS   │                    │
│ │Analyt│ │Spot │ │day  │ │Dyn  │                    │
│ └─────┘ └─────┘ └─────┘ └─────┘                    │
└─────────────────────────────────────────────────────┘
```

### Components:

- **SourceTypeSelector** {#source-type-selector}
- **SearchBox** {#search-box}
- **SourceTypeCards** {#source-type-cards} with logos (grid layout)

## 3. Connection Stage 1: Overview {#stage-1-overview} [Figma node ID: 11415:22244]

**Route:** `/new-connection/:sourceType/1`  
**Component:** `Stage1Overview`  
**Navigation:** First stage of wizard after source type selection  
**Example:** `/new-connection/postgresql/1`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Untitled                                            │
├─────────────┬───────────────────────────────────────┤
│ ● 1 Overview│ In this wizard, you will set up your │
│   2 Method  │ Source via the following steps:      │
│   3 Name    │                                       │
│   4 Details │ • Set up your source metadata         │
│   5 Output  │ • Connect to Source using your        │
│   6 Summary │   credentials                         │
│             │ • Confirm your Source is connected    │
│             │   and ready to use                    │
│             │                                       │
│             │ Note: connecting a Source does not    │
│             │ automatically download your data to   │
│             │ Phoenix. Data must be imported before │
│             │ it is used. A Sync is how you import  │
│             │ data to Phoenix.                      │
│             │                                       │
│             │ Required Information:                 │
│             │ □ Connection details (varies by       │
│             │   source type)                        │
│             │ □ Authentication credentials          │
│             │ □ Project location in Phoenix         │
│             │                                       │
│             │              [Back]    [Continue]     │
└─────────────┴───────────────────────────────────────┘
```

### Components:

- **StageIndicator** {#stage-indicator} (1-6 progress)
- **WizardContent** {#wizard-content} with requirements checklist
- **NavigationButtons** {#navigation-buttons} (Back/Continue)

## 4. Connection Stage 2: Method Selection {#stage-2-method} [Figma node ID: 11415:22153]

**Route:** `/new-connection/:sourceType/2`  
**Component:** `Stage2Method`  
**Navigation:** Continue from Stage 1 or direct access  
**Example:** `/new-connection/postgresql/2`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Untitled                                            │
├─────────────┬───────────────────────────────────────┤
│   1 Overview│ Choose Connection Method:             │
│ ● 2 Method  │                                       │
│   3 Name    │ ┌─────────────────────┐  ┌──────────┐ │
│   4 Details │ │ ✓ Direct Connection │  │  Agent   │ │
│   5 Output  │ │                     │  │Connection│ │
│   6 Summary │ │ • Simpler setup     │  │          │ │
│             │ │ • No components     │  │ • Works  │ │
│             │ │ • Cloud databases   │  │   with   │ │
│             │ │ • Public APIs       │  │ private  │ │
│             │ │                     │  │ networks │ │
│             │ └─────────────────────┘  │ • Requires│ │
│             │                          │   agent  │ │
│             │                          │ • Enhanced│ │
│             │                          │ security │ │
│             │                          │ • On-prem │ │
│             │                          │   data   │ │
│             │                          └──────────┘ │
│             │                                       │
│             │              [Back]    [Continue]     │
└─────────────┴───────────────────────────────────────┘
```

### Components:

- **ConnectionMethodSelector** {#connection-method-selector}
- **MethodOptionCard** {#method-option-card} (Direct/Agent)
- **MethodBenefitsList** {#method-benefits-list}

## 5. Connection Stage 3: Name and Location {#stage-3-name} [Figma node ID: 11415:21939]

**Route:** `/new-connection/:sourceType/3`  
**Component:** `Stage3Name`  
**Navigation:** Continue from Stage 2 or direct access  
**Example:** `/new-connection/postgresql/3`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Untitled                                            │
├─────────────┬───────────────────────────────────────┤
│   1 Overview│ Source Name:                          │
│   2 Method  │ [________________________]           │
│ ● 3 Name    │                                       │
│   4 Details │ Project:                              │
│   5 Output  │ /Name Space/Project Name              │
│   6 Summary │ [Use existing project] [Create new]   │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │              [Back]    [Continue]     │
└─────────────┴───────────────────────────────────────┘
```

### Sub-dialogs:

#### Existing Project Dialog {#existing-project-dialog} [Figma node ID: 11415:21608]

```
┌─────────────────────────────────┐
│ Select Project                  │
├─────────────────────────────────┤
│ ┌─ Name Space                  │
│ │  ├─ Project Alpha             │
│ │  ├─ Project Beta              │
│ │  └─ Project Gamma             │
│ └─ Other Namespace              │
│    ├─ Project Delta             │
│    └─ Project Echo              │
│                                 │
│           [Cancel]    [Select]  │
└─────────────────────────────────┘
```

#### New Project Dialog {#new-project-dialog} [Figma node ID: 11640:156065]

```
┌─────────────────────────────────┐
│ Create New Project              │
├─────────────────────────────────┤
│ Project Name:                   │
│ [________________________]     │
│                                 │
│ Description:                    │
│ [________________________]     │
│ [________________________]     │
│                                 │
│ Location:                       │
│ /Name Space/[New Project]       │
│                                 │
│           [Cancel]    [Create]  │
└─────────────────────────────────┘
```

### Components:

- **SourceNameInput** {#source-name-input}
- **ProjectSelector** {#project-selector}
- **ProjectDialog** {#project-dialog} (existing/new)
- **ProjectTree** {#project-tree}

## 6. Connection Stage 4: Connection Details {#stage-4-details} [Figma node ID: 11415:21995]

**Route:** `/new-connection/:sourceType/4`  
**Component:** `Stage4Details`  
**Navigation:** Continue from Stage 3 or direct access  
**Example:** `/new-connection/postgresql/4`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Untitled                                            │
├─────────────┬───────────────────────┬───────────────┤
│   1 Overview│ Connection Config     │ Preview       │
│   2 Method  │                       │               │
│   3 Name    │ Host: [__________]    │ ┌───────────┐ │
│ ● 4 Details │ Port: [____]          │ │ Loading...│ │
│   5 Output  │ Database: [_______]   │ │           │ │
│   6 Summary │ Username: [_______]   │ │ [Spinner] │ │
│             │ Password: [_______]   │ │           │ │
│             │                       │ └───────────┘ │
│             │ [Test Connection]     │               │
│             │                       │               │
│             │                       │               │
│             │                       │               │
│             │                       │               │
│             │     [Back] [Continue] │               │
└─────────────┴───────────────────────┴───────────────┘
```

### With Preview Loaded {#preview-loaded} [Figma node ID: 11640:150641]

```
┌─────────────────────────────────────────────────────┐
│                                 │ Data Structure    │
│                                 │ ├─ public         │
│                                 │ │  ├─ users       │
│                                 │ │  ├─ orders      │
│                                 │ │  └─ products    │
│                                 │ └─ analytics      │
│                                 │    ├─ sessions    │
│                                 │    └─ events      │
└─────────────────────────────────────────────────────┘
```

### Components:

- **ConnectionForm** {#connection-form} (dynamic per source type)
- **ConnectionTestButton** {#connection-test-button}
- **DataPreviewPanel** {#data-preview-panel}
- **ResourceTreePreview** {#resource-tree-preview}

## 7. Connection Stage 5: Output Location {#stage-5-output} [Figma node ID: 11415:21731]

**Route:** `/new-connection/:sourceType/5`  
**Component:** `Stage5Output`  
**Navigation:** Continue from Stage 4 or direct access  
**Example:** `/new-connection/postgresql/5`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Untitled                                            │
├─────────────┬───────────────────────────────────────┤
│   1 Overview│ Default Output Folder:                │
│   2 Method  │ /Name Space/Project Name/SourceName   │
│   3 Name    │                                       │
│   4 Details │ [Select a different folder]           │
│ ● 5 Output  │                                       │
│   6 Summary │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                     [Generate]        │
│             │                                       │
│             │              [Back]    [Continue]     │
└─────────────┴───────────────────────────────────────┘
```

### Generating Dialog {#generating-dialog} [Figma node ID: 11415:21335]

```
┌─────────────────────────────────┐
│ Generating Output Structure     │
├─────────────────────────────────┤
│ ✓ /Name Space                   │
│ ✓ /Name Space/Project Name      │
│ + /Name Space/.../SourceName    │
│ ⟳ /Name Space/.../SourceName/   │
│   └─ data                       │
│ + /Name Space/.../SourceName/   │
│   └─ configs                    │
│                                 │
│ Status: Creating folders...     │
│                                 │
│                      [Close]    │
└─────────────────────────────────┘
```

### Components:

- **OutputFolderDisplay** {#output-folder-display}
- **FolderSelector** {#folder-selector}
- **GenerateButton** {#generate-button}
- **GenerationDialog** {#generation-dialog} with progress indicators

## 8. Connection Stage 6: Summary {#stage-6-summary} [Figma node ID: 11415:21829]

**Route:** `/new-connection/:sourceType/6`  
**Component:** `Stage6Summary`  
**Navigation:** Final stage with completion options  
**Example:** `/new-connection/postgresql/6`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Customer Database                                   │
├─────────────┬───────────────────────────────────────┤
│   1 Overview│ Connection Summary                    │
│   2 Method  │                                       │
│   3 Name    │ Source Name: Customer Database        │
│   4 Details │ Source Type: PostgreSQL               │
│   5 Output  │ Connection Method: Direct             │
│ ● 6 Summary │ Host: customer-db.company.com:5432    │
│             │ Project: /Name Space/Analytics Project│
│             │ Output Folder: /Name Space/.../       │
│             │ Customer Database                     │
│             │                                       │
│             │ What to do next:                      │
│             │ [Explore]  [Open Source]             │
│             │                                       │
│             │              [Back]    [Finish]       │
└─────────────┴───────────────────────────────────────┘
```

### Components:

- **ConnectionSummary** {#connection-summary}
- **SummaryDetails** {#summary-details}
- **NextActionButtons** {#next-action-buttons} (Explore/Open Source)

## 9. Explore Interface: Initial View {#explore-interface} [Figma node ID: 11415:21355]

**Route:** `/source/explore/:sourceId` *(planned)*  
**Component:** `ExploreInterface`  
**Navigation:** Accessible from Stage 6 "Explore" button  
**Example:** `/source/explore/customer-database`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Resource Browser    │ Main Content                  │
├─────────────────────┼───────────────────────────────┤
│ [Search...]         │                               │
│                     │   Welcome to Data Explorer    │
│ ├─ public           │                               │
│ │  ├─ users         │   Select a resource from the  │
│ │  ├─ orders        │   left sidebar to preview     │
│ │  └─ products      │   its contents.               │
│ └─ analytics        │                               │
│    ├─ sessions      │   [Placeholder Image]         │
│    └─ events        │                               │
│                     │                               │
└─────────────────────┴───────────────────────────────┘
```

### Loading State {#explore-loading} [Figma node ID: 11442:15627]

```
┌─────────────────────────────────────────────────────┐
│ Resource Browser    │ Main Content                  │
├─────────────────────┼───────────────────────────────┤
│ [Search...]         │                               │
│                     │                               │
│ ├─ public           │        Loading...             │
│ │  ├─ users         │                               │
│ │  ├─►orders◄       │       [Spinner]               │
│ │  └─ products      │                               │
│ └─ analytics        │   Retrieving resource info    │
│    ├─ sessions      │                               │
│    └─ events        │                               │
│                     │                               │
└─────────────────────┴───────────────────────────────┘
```

### Loaded State {#explore-loaded} [Figma node ID: 11415:21415]

```
┌────────────────────┬─────────────────────────┬──────────┐
│ Resource Browser   │ Resource Details        │ Actions  │
├────────────────────┼─────────────────────────┼──────────┤
│ [Search...]        │ Table: orders           │          │
│                    │ Rows: 1,245,678         │ [Create  │
│ ├─ public          │ Columns: 8              │  Sync]   │
│ │  ├─ users        │ Size: 45.2 MB           │          │
│ │  ├─►orders◄      │                         │ Resource │
│ │  └─ products     │ ┌─────────────────────┐ │ Info:    │
│ └─ analytics       │ │id  │name │amount│... │ │          │
│    ├─ sessions     │ ├────┼─────┼──────┼───┤ │ • Type:  │
│    └─ events       │ │1   │Joe  │99.50 │...│ │   Table  │
│                    │ │2   │Jane │150.00│...│ │ • Schema:│
│                    │ │3   │Bob  │75.25 │...│ │   public │
│                    │ └─────────────────────┘ │          │
└────────────────────┴─────────────────────────┴──────────┘
```

### Components:

- **ResourceBrowser** {#resource-browser} (left sidebar)
- **ResourceSearch** {#resource-search}
- **ResourceTree** {#resource-tree}
- **MainContentArea** {#main-content-area}
- **EmptyState** {#empty-state}
- **LoadingState** {#loading-state}
- **ResourceDetails** {#resource-details}
- **DataPreview** {#data-preview}
- **ActionsPanel** {#actions-panel} (right sidebar)

## 10. Table Details Panel {#table-details-panel} [Figma node ID: 11415:22943]

### Mapping Tab {#mapping-tab}

```
┌─────────────────────────────────────────────────────┐
│ Table Details                           [Mapping] Advanced │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ☑ Select All Columns                               │
│                                                     │
│ ┌─────┬──────────┬────────────┬─────────┬────────┐ │
│ │ ☑   │ Source   │ Destination│ Source  │ Dest   │ │
│ │     │ Column   │ Column     │ Type    │ Type   │ │
│ ├─────┼──────────┼────────────┼─────────┼────────┤ │
│ │ ☑   │ id       │ id         │ integer │ int ▼  │ │
│ │ ☑   │ name     │ name       │ varchar │ text▼  │ │
│ │ ☑   │ amount   │ amount     │ decimal │ float▼ │ │
│ │ ☑   │ created  │ created_at │ timestamp│date▼  │ │
│ └─────┴──────────┴────────────┴─────────┴────────┘ │
│                                                     │
│                    [Reset] [Save] [Cancel]          │
└─────────────────────────────────────────────────────┘
```

### Advanced Tab {#advanced-tab} [Figma node ID: 11441:13761]

```
┌─────────────────────────────────────────────────────┐
│ Table Details                           Mapping [Advanced] │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Table Name: [orders____________]                    │
│                                                     │
│ □ Use first row as column names                     │
│                                                     │
│ Fields delimiter: [Comma (,)    ▼]                  │
│ Field wrapper (quotes): [Double quote (") ▼]       │
│ Field value escape character: [Backslash (\) ▼]     │
│                                                     │
│ Column data type analysis method:                   │
│ [Smart detection ▼]                                 │
│                                                     │
│                    [Reset] [Save] [Cancel]          │
└─────────────────────────────────────────────────────┘
```

### Dropdown Examples {#dropdown-examples} [Figma node ID: 11552:12273]

```
┌─────────────────────┐
│ Fields delimiter    │
├─────────────────────┤
│ ✓ Comma (,)         │
│   Tab (\t)          │
│   Semicolon (;)     │
│   Pipe (|)          │
│   Space ( )         │
│   Custom...         │
└─────────────────────┘
```

### Components:

- **TableDetailsPanel** {#table-details-panel-component}
- **MappingTab** {#mapping-tab-component}
- **AdvancedTab** {#advanced-tab-component}
- **ColumnMappingTable** {#column-mapping-table}
- **DropdownSelectors** {#dropdown-selectors}
- **TableConfigForm** {#table-config-form}

## 11. Sync Creation - Multiple Resources {#sync-creation-multi} [Figma node ID: 11415:22451]

**Route:** `/source/sync/create/multi` *(planned)*  
**Component:** `MultiSyncCreator`  
**Navigation:** Accessible from Explore interface with multiple resources selected  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ 3 New Sync                                          │
├─────────┬───────────────────────────────────────────┤
│ ☑ users │ Schedule Settings:                        │
│ ☑ orders│                                           │
│ ☑ prod. │ Run: [Manual ▼]                           │
│         │                                           │
│         │ ⚠ Manual syncs require manual execution   │
│         │                                           │
│         │ Transaction Type:                         │
│         │ ○ Snapshot  ● Append  ○ Update            │
│         │                                           │
│         │ Snapshot: Replaces all data with new     │
│         │ Append: Adds new data only                │
│         │ Update: Merges changes with existing      │
│         │                                           │
│         │                          [Create Syncs]  │
└─────────┴───────────────────────────────────────────┘
```

### Components:

- **MultiSyncCreator** {#multi-sync-creator}
- **ResourceSelectionList** {#resource-selection-list}
- **ScheduleSelector** {#schedule-selector}
- **TransactionTypeSelector** {#transaction-type-selector}
- **SyncConfigurationForm** {#sync-configuration-form}

## 12. Sync Creation - Single Resource {#sync-creation-single} [Figma node ID: 11415:22676]

**Route:** `/source/sync/create/:resourceId` *(planned)*  
**Component:** `SingleSyncCreator`  
**Navigation:** Accessible from Explore interface or "Create Sync" button  
**Example:** `/source/sync/create/orders-table`  

### Overview Tab {#sync-overview-tab}

```
┌─────────────────────────────────────────────────────┐
│ New Sync                            [Overview] Configuration │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Sync Name: [orders_sync_______________]             │
│                                                     │
│ Output Folder:                                      │
│ /Name Space/Project/Source/orders                   │
│ [📁 Change folder]                                  │
│                                                     │
│ Resource Properties:                                │
│ • Type: Database Table                              │
│ • Schema: public                                    │
│ • Rows: 1,245,678                                   │
│ • Columns: 8                                        │
│ • Size: 45.2 MB                                     │
│                                                     │
│ Preview:                                            │
│ ┌─────────────────────────────────────────────────┐ │
│ │ id │ name    │ amount  │ created_at             │ │
│ │ 1  │ John    │ 99.50   │ 2024-01-15 10:30:00   │ │
│ │ 2  │ Jane    │ 150.00  │ 2024-01-15 11:45:00   │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│                          [Finish and view summary] │
└─────────────────────────────────────────────────────┘
```

### Configuration Tab {#sync-configuration-tab} [Figma node ID: 11415:22763]

```
┌─────────────────────────────────────────────────────┐
│ New Sync                            Overview [Configuration] │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Schedule: [Manual ▼]                                │
│                                                     │
│ Transaction Type:                                   │
│ ● Snapshot  ○ Append  ○ Update                      │
│                                                     │
│ Advanced Settings:                                  │
│ ☑ Include column headers                            │
│ ☑ Validate data types                               │
│ □ Skip empty rows                                   │
│                                                     │
│ Output Format:                                      │
│ ○ Parquet  ● CSV  ○ JSON                            │
│                                                     │
│                          [Finish and view summary] │
└─────────────────────────────────────────────────────┘
```

### Components:

- **SingleSyncCreator** {#single-sync-creator}
- **SyncOverviewTab** {#sync-overview-tab-component}
- **SyncConfigurationTab** {#sync-configuration-tab-component}
- **SyncNameInput** {#sync-name-input}
- **FolderSelector** {#folder-selector-component}
- **ResourceProperties** {#resource-properties}
- **SyncPreview** {#sync-preview}

## 13. Source Details - Overview Tab {#source-details-overview} [Figma node ID: 11442:16268]

**Route:** `/source/details/:sourceId` *(planned)*  
**Component:** `SourceDetailsPage`  
**Navigation:** Accessible from Stage 6 "Open Source" button  
**Example:** `/source/details/customer-database`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Customer Database                    PostgreSQL     │
│ [Overview] Edit Syncs  Connection Settings  Explore │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Connection Status: ● Active                         │
│ Last Updated: July 20, 2024 10:30 AM               │
│                                                     │
│ Quick Stats:                                        │
│ • Tables: 12                                        │
│ • Active Syncs: 3                                   │
│ • Last Sync: July 20, 2024 9:15 AM                 │
│                                                     │
│ Recent Syncs:                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Sync Name      │ Status    │ Next Run           │ │
│ ├────────────────┼───────────┼────────────────────┤ │
│ │ users_sync     │ ● Active  │ July 21, 8:00 AM  │ │
│ │ orders_sync    │ ● Active  │ July 21, 8:00 AM  │ │
│ │ products_sync  │ ⚠ Warning │ Manual             │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│                              [Create Batch Sync]   │
└─────────────────────────────────────────────────────┘
```

### Components:

- **SourceHeader** {#source-header}
- **TabNavigation** {#tab-navigation-component}
- **ConnectionStatus** {#connection-status}
- **QuickStats** {#quick-stats}
- **RecentSyncsList** {#recent-syncs-list}
- **CreateSyncButton** {#create-sync-button}

## 14. Edit Syncs Tab {#edit-syncs-tab} [Figma node ID: 11640:161064]

**Route:** `/source/details/:sourceId/syncs` *(planned)*  
**Component:** `EditSyncsTab`  
**Navigation:** Tab within Source Details page  
**Example:** `/source/details/customer-database/syncs`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Customer Database                                   │
│ Overview [Edit Syncs] Connection Settings  Explore  │
├─────────────┬───────────────────────────────────────┤
│ Resources   │ Existing Syncs                        │
│             │                                       │
│ ├─ public   │ ┌─────────────────────────────────┐   │
│ │  ├─ users │ │ users_sync                      │   │
│ │  ├─ orders│ │ Schedule: Daily 8:00 AM         │   │
│ │  └─ prod. │ │ Status: ● Active                │   │
│ └─ analytics│ │                        [Edit]   │   │
│    ├─ sess. │ └─────────────────────────────────┘   │
│    └─ events│                                       │
│             │ ┌─────────────────────────────────┐   │
│             │ │ orders_sync                     │   │
│             │ │ Schedule: Daily 8:00 AM         │   │
│             │ │ Status: ● Active                │   │
│             │ │                        [Edit]   │   │
│             │ └─────────────────────────────────┘   │
│             │                                       │
│             │                 [Create New Sync]     │
└─────────────┴───────────────────────────────────────┘
```

### Components:

- **EditSyncsTab** {#edit-syncs-tab-component}
- **ResourcesPanel** {#resources-panel}
- **ExistingSyncsList** {#existing-syncs-list}
- **SyncCard** {#sync-card}
- **CreateNewSyncButton** {#create-new-sync-button}

## 15. Edit Single Sync {#edit-single-sync} [Figma node ID: 11640:161505]

**Route:** `/source/sync/edit/:syncId` *(planned)*  
**Component:** `EditSyncSingle`  
**Navigation:** Accessible from "Edit" button in sync cards  
**Example:** `/source/sync/edit/users-sync`  

### Overview Tab {#edit-sync-overview-tab}

```
┌─────────────────────────────────────────────────────┐
│ Edit Sync: users_sync           [Discard] [Save]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ [Overview] Configuration                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Sync Name: [users_sync____________]                 │
│                                                     │
│ Output Folder:                                      │
│ /Name Space/Project/Source/users                    │
│ [📁 Change folder]                                  │
│                                                     │
│ Resource Properties:                                │
│ • Type: Database Table                              │
│ • Schema: public                                    │
│ • Rows: 50,234                                      │
│ • Columns: 6                                        │
│ • Size: 12.8 MB                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Configuration Tab {#edit-sync-configuration-tab} [Figma node ID: 11640:161430]

```
┌─────────────────────────────────────────────────────┐
│ Edit Sync: users_sync           [Discard] [Save]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Overview [Configuration]                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Schedule: [Daily at 8:00 AM ▼]                      │
│                                                     │
│ Transaction Type:                                   │
│ ● Snapshot  ○ Append  ○ Update                      │
│                                                     │
│ Last Run: July 20, 2024 8:00 AM                    │
│ Next Run: July 21, 2024 8:00 AM                    │
│ Status: ● Active                                    │
│                                                     │
│                                        [Run Now]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Components:

- **EditSyncHeader** {#edit-sync-header}
- **SyncEditTabs** {#sync-edit-tabs}
- **SyncOverviewEditor** {#sync-overview-editor}
- **SyncConfigurationEditor** {#sync-configuration-editor}
- **SaveDiscardButtons** {#save-discard-buttons}

## 16. Connection Settings Tab {#connection-settings-tab} [Figma node ID: 11442:16592]

**Route:** `/source/details/:sourceId/settings` *(planned)*  
**Component:** `ConnectionSettingsTab`  
**Navigation:** Tab within Source Details page  
**Example:** `/source/details/customer-database/settings`  

### Layout Structure:

```
┌─────────────────────────────────────────────────────┐
│ Customer Database                                   │
│ Overview Edit Syncs [Connection Settings] Explore   │
├─────────────┬───────────────────────────────────────┤
│ Name and    │ Source Name:                          │
│ location    │ [Customer Database____________]       │
│             │                                       │
│ Connection  │ Provide a unique, distinguishable     │
│ details     │ source name that differs from other   │
│             │ resources in this location            │
│ Output      │                                       │
│ folder      │ Project to save Source in:            │
│             │ /Name Space/Analytics Project/        │
│             │ Customer Database                     │
│             │                          [Change]     │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                                       │
│             │                   [Discard] [Save]    │
└─────────────┴───────────────────────────────────────┘
```

### Components:

- **ConnectionSettingsTab** {#connection-settings-tab-component}
- **SettingsNavigation** {#settings-navigation} (left sidebar)
- **NameLocationSection** {#name-location-section}
- **ConnectionDetailsSection** {#connection-details-section}
- **OutputFolderSection** {#output-folder-section}
- **SaveDiscardButtons** {#save-discard-buttons-component}

## Summary: Complete Component List {#component-summary}

### 🏠 **Home & Navigation Components** {#home-navigation-components}

1. `TabNavigation` {#tab-navigation-summary}
2. `NewSourceButton` {#new-source-button-summary}
3. `QuickSetupCards` {#quick-setup-cards-summary}
4. `RecentSourcesList` {#recent-sources-list-summary}

### 🧙‍♂️ **Wizard Components** {#wizard-components}

5. `WizardContainer` {#wizard-container-summary}
6. `StageIndicator` {#stage-indicator-summary}
7. `SourceTypeSelector` {#source-type-selector-summary}
8. `ConnectionMethodSelector` {#connection-method-selector-summary}
9. `ProjectSelector` {#project-selector-summary}
10. `ConnectionForm` {#connection-form-summary}
11. `OutputFolderGenerator` {#output-folder-generator-summary}
12. `ConnectionSummary` {#connection-summary-summary}

### 🔍 **Explore Components** {#explore-components}

13. `ExploreInterface` {#explore-interface-summary}
14. `ResourceBrowser` {#resource-browser-summary}
15. `ResourceTree` {#resource-tree-summary}
16. `ResourceSearch` {#resource-search-summary}
17. `EmptyState` {#empty-state-summary}
18. `LoadingState` {#loading-state-summary}
19. `ResourceDetails` {#resource-details-summary}
20. `DataPreview` {#data-preview-summary}
21. `ActionsPanel` {#actions-panel-summary}
22. `TableDetailsPanel` {#table-details-panel-summary}
23. `MappingTab` {#mapping-tab-summary}
24. `AdvancedTab` {#advanced-tab-summary}

### ⚙️ **Source Management Components** {#source-management-components}

25. `SourceDetailsPage` {#source-details-page-summary}
26. `OverviewTab` {#overview-tab-summary}
27. `EditSyncsTab` {#edit-syncs-tab-summary}
28. `ConnectionSettingsTab` {#connection-settings-tab-summary}
29. `SourceHeader` {#source-header-summary}
30. `ConnectionStatus` {#connection-status-summary}
31. `QuickStats` {#quick-stats-summary}

### 🔄 **Sync Management Components** {#sync-management-components}

32. `SyncCreator` {#sync-creator-summary}
33. `MultiResourceSync` {#multi-resource-sync-summary}
34. `SingleResourceSync` {#single-resource-sync-summary}
35. `SyncOverviewTab` {#sync-overview-tab-summary}
36. `SyncConfigurationTab` {#sync-configuration-tab-summary}
37. `EditSyncSingle` {#edit-sync-single-summary}
38. `EditSyncMultiple` {#edit-sync-multiple-summary}
39. `SyncScheduler` {#sync-scheduler-summary}
40. `TransactionTypeSelector` {#transaction-type-selector-summary}

### 🛠️ **Utility Components** {#utility-components}

41. `NavigationButtons` {#navigation-buttons-summary}
42. `SaveDiscardButtons` {#save-discard-buttons-summary}
43. `DropdownSelectors` {#dropdown-selectors-summary}
44. `FolderSelector` {#folder-selector-summary}
45. `GenerationDialog` {#generation-dialog-summary}
46. `ProjectDialog` {#project-dialog-summary}
47. `BreadcrumbNavigation` {#breadcrumb-navigation-summary}

This comprehensive list covers all the UI components needed to implement the complete Data Connection application based on the screenshots and descriptions in the user guideline document.

## Implementation Notes {#implementation-notes}

### Visual Hierarchy {#visual-hierarchy}

- Primary actions (New Source, Continue, Save) use prominent styling
- Secondary actions (Back, Cancel, Discard) use subtle styling
- Status indicators use color coding (green=active, yellow=warning, red=error)
- Progress indicators show completion state with filled/unfilled circles

### Interaction Patterns {#interaction-patterns}

- Multi-step wizards with clear progress indication
- Three-panel layouts for complex data browsing
- Modal dialogs for secondary actions (project selection, folder selection)
- Tabbed interfaces for related functionality grouping
- Dropdown selectors for configuration options

### Responsive Considerations {#responsive-considerations}

- Fixed-width layouts for wizard steps (800px max-width)
- Flexible grid layouts for card-based sections
- Sidebar + main content layouts with proper proportions
- Action buttons consistently positioned (usually bottom-right)

This specification provides the complete visual blueprint for implementing the Data Connection application with pixel-perfect accuracy to the documented designs.

## 🔗 Component Cross-References {#component-cross-references}

### Navigation Flow Relationships
- **[NewSourceButton](#new-source-button)** → Triggers **[SourceTypeSelector](#source-type-selector)**
- **[SourceTypeSelector](#source-type-selector)** → Loads **[Stage1Overview](#stage-1-overview)**
- **[NavigationButtons](#navigation-buttons)** → Used across all wizard stages for progression
- **[StageIndicator](#stage-indicator)** → Updates throughout **[6-Stage Wizard](#stage-1-overview)**

### Modal Dialog Relationships
- **[ProjectSelector](#project-selector)** → Opens **[ProjectDialog](#project-dialog)**
- **[FolderSelector](#folder-selector)** → Opens **[FolderSelectorDialog](#generating-dialog)**
- **[GenerateButton](#generate-button)** → Shows **[GenerationDialog](#generating-dialog)**
- **[TableDetailsPanel](#table-details-panel)** → Contains **[MappingTab](#mapping-tab)** and **[AdvancedTab](#advanced-tab)**

### Data Flow Relationships
- **[ConnectionForm](#connection-form)** → Populates **[DataPreviewPanel](#data-preview-panel)**
- **[ResourceBrowser](#resource-browser)** → Updates **[MainContentArea](#main-content-area)**
- **[ResourceTree](#resource-tree)** → Feeds **[ResourceDetails](#resource-details)**
- **[ConnectionSummary](#connection-summary)** → Links to **[ExploreInterface](#explore-interface)**

### State Management Relationships
- **[TabNavigation](#tab-navigation)** ↔ **[MainContentArea](#main-content-area)** (tab switching)
- **[StageIndicator](#stage-indicator)** ↔ **[WizardContent](#wizard-content)** (stage progression)
- **[ResourceBrowser](#resource-browser)** ↔ **[DataPreview](#data-preview)** (resource selection)
- **[SyncConfigurationForm](#sync-configuration-form)** ↔ **[SyncPreview](#sync-preview)** (configuration updates)

### Reusable Component Patterns
- **[NavigationButtons](#navigation-buttons)** - Used in all wizard stages and dialogs
- **[SaveDiscardButtons](#save-discard-buttons)** - Used in settings and editing interfaces
- **[LoadingState](#loading-state)** - Used during async operations (connection testing, data loading)
- **[DropdownSelectors](#dropdown-selectors)** - Used for schedules, data types, and configuration options
- **[SearchBox](#search-box)** - Used in source selection and resource browsing

This cross-reference system enables easy navigation between related components and understanding of component interaction patterns throughout the Data Connection application.

## 🛣️ Route Architecture {#route-architecture}

### Current Implementation Routes

#### Main Application Routes (with Layout)
```
/source              → HomePage Component
/sync                → SyncPage Component (placeholder)
/agents              → AgentsPage Component (placeholder)
```

#### Wizard Routes (standalone)
```
/new-connection                    → SourceTypeSelector Component
/new-connection/:sourceType/:stage → WizardContainer Component
```

### Route Navigation Patterns

#### Primary Navigation Flow
```
HomePage (/source)
├─ New Source Button → /new-connection
├─ Quick Setup Cards → /new-connection
└─ Tab Navigation    → /sync, /agents

SourceTypeSelector (/new-connection)
└─ Source Selection → /new-connection/{sourceType}/1

WizardContainer (/new-connection/:sourceType/:stage)
├─ Stage 1 → /new-connection/:sourceType/1
├─ Stage 2 → /new-connection/:sourceType/2  
├─ Stage 3 → /new-connection/:sourceType/3
├─ Stage 4 → /new-connection/:sourceType/4
├─ Stage 5 → /new-connection/:sourceType/5
└─ Stage 6 → /new-connection/:sourceType/6
```

#### Navigation Controls
- **Continue Button**: `/new-connection/:sourceType/{stage+1}`
- **Back Button**: `/new-connection/:sourceType/{stage-1}`
- **Cancel Button**: `/new-connection` or `/source`
- **Finish Button**: `/source`

### Route Parameters

#### `:sourceType` Parameter Examples
| Parameter Value | Display Name | Description |
|----------------|--------------|-------------|
| `postgresql` | PostgreSQL | PostgreSQL database connection |
| `sas` | SAS | SAS data files |
| `mysql` | MySQL | MySQL database connection |
| `microsoft-sql-server-odbc` | SQL Server | SQL Server via ODBC |
| `merge-access` | Access | Microsoft Access files |

#### `:stage` Parameter Values
| Stage | Component | URL Pattern |
|-------|-----------|-------------|
| `1` | Stage1Overview | `/new-connection/:sourceType/1` |
| `2` | Stage2Method | `/new-connection/:sourceType/2` |
| `3` | Stage3Name | `/new-connection/:sourceType/3` |
| `4` | Stage4Details | `/new-connection/:sourceType/4` |
| `5` | Stage5Output | `/new-connection/:sourceType/5` |
| `6` | Stage6Summary | `/new-connection/:sourceType/6` |

### Planned Routes (Future Implementation)

#### Source Management Routes
```
/source/details/:sourceId           → SourceDetailsPage
/source/details/:sourceId/overview  → OverviewTab
/source/details/:sourceId/syncs     → EditSyncsTab  
/source/details/:sourceId/settings  → ConnectionSettingsTab
/source/details/:sourceId/explore   → ExploreTab (redirect to explore)
```

#### Data Exploration Routes
```
/source/explore/:sourceId           → ExploreInterface
/source/explore/:sourceId/:resource → ResourceDetails view
```

#### Sync Management Routes
```
/source/sync/create/:resourceId     → SingleSyncCreator
/source/sync/create/multi           → MultiSyncCreator
/source/sync/edit/:syncId           → EditSyncSingle
/source/sync/edit/:syncId/overview  → SyncOverviewEditor
/source/sync/edit/:syncId/config    → SyncConfigurationEditor
```

### Modal Overlays (No Route Change)
These components render as overlays without changing the current route:
- **ProjectDialog** - Project selection modal
- **FolderSelectorDialog** - Folder browsing modal
- **GenerationDialog** - Progress tracking modal
- **TableDetailsPanel** - Table configuration modal

### Route State Management
- **Active Tab Detection**: Uses `useLocation()` hook to determine current route
- **Wizard Progress**: Stage parameter used for progress bar calculation
- **Breadcrumb Generation**: Dynamic breadcrumbs based on current route and parameters
- **Navigation Guards**: Validation before allowing navigation between wizard stages
