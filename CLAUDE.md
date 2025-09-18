# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Starts Vite development server with HMR
- **Build for production**: `npm run build` - TypeScript compilation + Vite build
- **Lint code**: `npm run lint` - Runs ESLint on the codebase
- **Preview production build**: `npm run preview` - Preview the production build locally

## Architecture Overview

This is a React TypeScript application built with Vite, designed to support both a main application and a complex data-connection sub-application using Feature-Sliced Design (FSD) architecture.

### Key Technologies
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite with React plugin
- **State Management**: Effector for reactive state management
- **Routing**: React Router DOM
- **UI Libraries**: Mantine UI (primary), Ant Design (legacy support)
- **HTTP Client**: ky (primary), Axios (legacy support)
- **Additional**: React Grid Layout, React Markdown, UUID generation
- **Linting**: ESLint with TypeScript rules

### Project Structure

This codebase is structured to support two main applications:

**1. Main Application (Root src/)**
Currently contains a basic Vite React template but is configured to support FSD architecture:

```
src/
├── app/             # Application initialization, providers, routing
├── pages/           # Route components
├── features/        # Business logic features
├── entities/        # Business entities and domain models
├── shared/          # Reusable resources (UI, API, utils, config)
└── widgets/         # Complex UI compositions
```

**2. Data Connection Application (docs/data-connection/)**
A separate Phoenix-inspired application for data management with full FSD implementation.

### Architecture Patterns

**Feature-Sliced Design (FSD) Ready:**
- Hierarchical architecture with clear dependency rules
- Each layer can only import from layers below it
- Feature-based organization for business logic
- Centralized shared resources

**State Management:**
- Effector stores for reactive state management
- Event-driven architecture
- Centralized API effects and error handling

**Path Aliases Configuration:**
- `@shared/` maps to `src/shared/`
- `#/` maps to `src/`
- Vite and TypeScript configured for clean imports

### Technology Stack Integration

**Dual UI Library Support:**
- **Mantine UI**: Modern component library for new features
- **Ant Design**: Legacy support for existing components
- CSS Modules for scoped styling

**HTTP Client Strategy:**
- **ky**: Primary HTTP client for new API integrations
- **Axios**: Legacy support with mock adapter for testing

**State Management Philosophy:**
- Effector for complex state logic and reactive programming
- Event-driven architecture for decoupled components
- Centralized error handling and notifications

### Development Workflow

**Path Mapping:**
- Use TypeScript path aliases for clean imports
- Vite handles module resolution with proper aliasing
- ESLint configured for path validation

**Build Configuration:**
- TypeScript strict mode enabled
- Vite optimized for production builds
- Tree-shaking and code splitting supported

**Architecture Migration Notes:**
- Project is configured to support FSD architecture
- Main application can be migrated from basic template to FSD structure
- Data connection sub-application demonstrates full FSD implementation
- Path aliases and build tools already configured for FSD patterns

### Environment Configuration

**Build System:**
- Vite with React plugin for fast development
- TypeScript compilation with strict type checking
- ESLint for code quality enforcement

**Module System:**
- ES modules with Vite bundling
- Path mapping for clean architecture
- Support for both legacy and modern patterns