# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Starts Vite development server with HMR
- **Build for production**: `npm run build` - TypeScript compilation + Vite build
- **Lint code**: `npm run lint` - Runs ESLint on the codebase
- **Preview production build**: `npm run preview` - Preview the production build locally

## Architecture Overview

This is a React TypeScript application built with Vite, using a Feature-Sliced Design (FSD) architecture pattern with state management via Effector.

### Key Technologies
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite with React plugin
- **State Management**: Effector for reactive state management
- **Routing**: React Router DOM for main app, Atomic Router for legacy pages
- **UI Components**: Mantine UI + Ant Design (legacy)
- **HTTP Client**: Axios (primary) + ky (legacy)
- **Additional**: React Grid Layout, React Markdown, UUID generation
- **Linting**: ESLint with TypeScript rules

### Project Structure

This codebase contains two main applications:

**1. Legacy Application (Root src/)**
```
src/
├── pages/           # Legacy pages (sign-in, sign-up, posts, post)
│   ├── [feature]/
│   │   ├── index.ts # Feature barrel export
│   │   ├── model.ts # Effector stores, events, effects
│   │   └── ui.tsx   # React components
├── shared/          # Shared utilities and components
│   ├── api/         # API layer with ky client
│   ├── components/  # Reusable React components (BaseLayout)
│   └── auth/        # Authentication logic
└── app/             # Application setup and providers
```

**2. Data Connection Application (src/data-connection/)**
```
src/data-connection/
├── src/
│   ├── app/         # Application shell with routing and layout
│   │   ├── router/  # Router configuration
│   │   └── ui/      # Layout components
│   ├── pages/       # Route components (source, agents)
│   │   ├── source/  # Data source management with complex UI
│   │   └── agents/  # Agent management
│   └── [feature]/
│       ├── model/   # Effector stores, events, effects, connections
│       │   ├── stores/
│       │   ├── events/
│       │   ├── effects/
│       │   └── connections/
│       └── ui/      # React components with CSS modules
└── package.json     # Separate package configuration
```

### State Management Pattern
- Each page follows the **model-view** pattern
- `model.ts` contains Effector stores, events, and effects
- `ui.tsx` contains React components that consume the model
- API effects are centralized in the shared API layer
- Error handling is unified through shared notification effects

### Routing Architecture
- Uses Atomic Router for type-safe routing
- Routes are defined in shared configuration
- Each page exports route configuration via index.ts
- Pages are registered in `src/pages/index.ts` using `createRoutesView`

### API Integration
- Centralized API client in `src/shared/api/api.ts`
- Uses ky HTTP client with base URL from environment variables
- Unified error handling with server message extraction
- Environment variable: `VITE_API_URL` for API base URL

### Authentication
- Token-based authentication system
- Authentication state managed in `@shared/auth`
- BaseLayout includes exit functionality for token clearing
- Route protection likely implemented via atomic-router chains

## Data Connection Application

The `src/data-connection/` directory contains a separate Phoenix-inspired application following Feature-Sliced Design (FSD) architecture:

### Features
- **External System Connections**: Configure live connections to production systems
- **File Upload**: Manual upload of data extracts (CSV, JSON, Excel, Parquet)
- **Data Generation**: Synthesize sample data for development (planned)
- **Recent Connections**: View and manage recently accessed connections
- **Sync Management**: Monitor and control data synchronization processes
- **Agent Management**: Configure connection agents and workers

### Architecture Patterns
- **Feature-Sliced Design**: Pages contain complex nested feature structures
- **Granular Model Organization**: Each feature has dedicated stores, events, effects, and connections
- **CSS Modules**: Component-scoped styling with `.module.css` files
- **Mock Data Integration**: Currently uses mock data for development

## Development Notes

### Path Aliases
- `@shared/` maps to `src/shared/`
- `#/` maps to `src/`
- Ensure TypeScript path mapping is configured in vite.config.ts

### Architecture Patterns
- **Legacy pages**: Follow FSD structure: index.ts (barrel) → model.ts (logic) → ui.tsx (presentation)
- **Data Connection pages**: Follow deeper FSD with nested model organization
- **UI Libraries**: Mantine UI for modern components, Ant Design for legacy components
- **State Management**: Effector with centralized error handling via shared notification effects
- **Styling**: CSS Modules for scoped styles in Data Connection app

### Development Workflow for Data Connection

1. **API Integration**: All endpoints are available - connect wizard stages to backend
2. **Component Implementation Priority**:
   - Source Type Selection (main entry point)
   - Wizard Stage Components (6 stages)
   - Explore Interface (resource browser + data preview)
   - Sync Management (creation and editing)
   - Connection Settings (full CRUD)
3. **Testing Approach**: Use mock data initially, then integrate with real endpoints
4. **UI Consistency**: Follow Mantine Design System with custom CSS modules
5. **State Flow**: Effector stores → events → effects → API calls → UI updates

### Key Components to Implement

**Source Wizard Stages:**
1. `Overview` - Introduction and requirements checklist
2. `ConnectionMethod` - Direct vs Agent-based selection
3. `NameOrganize` - Source naming and project location
4. `ConfigureDetails` - Connection parameters and testing
5. `OutputLocation` - Default folder configuration
6. `ReviewSummary` - Final review and completion

**Explore Interface:**
- `ResourceBrowser` - Left sidebar with hierarchical data structure
- `DataPreview` - Main content with table/file preview
- `ActionsPanel` - Right sidebar with sync creation options
- `TableDetailsModal` - Advanced configuration (Mapping/Advanced tabs)

**Sync Management:**
- `SyncCreation` - Multi-resource and single-resource workflows
- `SyncConfiguration` - Schedule, transaction types, output settings
- `EditSyncs` - Batch operations and status monitoring

**Connection Management:**
- `ConnectionDetails` - Source overview with tabs
- `ConnectionSettings` - Name/location, details, output folder sections
- `SaveDiscardButtons` - Change management with confirmations