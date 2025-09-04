# Data Connection App

A Phoenix application for managing data connections and synchronization between Phoenix and external systems.

## Overview

The Data Connection app provides a centralized interface for:
- Connecting to external data systems
- Uploading static data files
- Managing data synchronization
- Monitoring connection status and performance

## Features

- **External System Connections**: Configure live connections to production systems
- **File Upload**: Manual upload of data extracts (CSV, JSON, Excel, Parquet)
- **Data Generation**: Synthesize sample data for development (planned feature)
- **Recent Connections**: View and manage recently accessed connections
- **Sync Management**: Monitor and control data synchronization processes
- **Agent Management**: Configure connection agents and workers

## Architecture

This application follows Phoenix's Feature-Sliced Design (FSD) architecture:

- `src/app/` - Application shell with routing and layout
- `src/pages/` - Route components (Landing, Source, Sync, Agents)
- `src/widgets/` - Composite UI components (ConnectionCards, RecentConnections)
- `src/features/` - Business features (connection setup, file upload)
- `src/shared/` - App-specific shared code (constants, types, state)

## Navigation

The app includes four main sections accessible via tabs:

1. **Data connection** - Main landing page with connection overview
2. **Source** - Source configuration and management
3. **Sync** - Synchronization monitoring and control
4. **Agents** - Connection agent management

## Development

```bash
# Start shell with Data Connection app
cd client/apps/shell
yarn dev

# Lint the application
yarn lint --filter=@pages/data-connection

# Build the application
yarn build --filter=@pages/data-connection
```

## Integration

This app integrates with the Phoenix shell through:
- Manifest configuration (`manifest.json`)
- Shell routing (`/data-connection/*`)
- Sidebar navigation with database icon
- Lazy loading for performance

## Mock Data

The app currently uses mock data for development. Real API integration will be added in future iterations.