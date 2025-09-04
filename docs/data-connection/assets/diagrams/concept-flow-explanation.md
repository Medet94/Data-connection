# Data Connection Concept Flow

## 1. DATA SOURCE
- Where your data currently lives
- Examples: PostgreSQL, S3, local files, APIs
- The starting point of your data journey

## 2. CONNECTION
- How Phoenix reaches your data source
- **Direct Connection**: Phoenix connects directly over the internet
- **Agent Connection**: Uses agent software in your network

## 3. SYNC
- What specific data moves from source to Phoenix
- Defines tables, files, or data matching criteria
- Sets the schedule (one-time, hourly, daily, etc.)

## Flow Diagram
```
┌───────────────┐      ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│ DATA SOURCE   │      │  CONNECTION    │      │     SYNC      │      │    PHOENIX    │
│               │      │               │      │               │      │               │
│ PostgreSQL    │──────> Direct        │──────> Table A       │──────> Data available │
│ S3            │      │ OR            │      │ Table B       │      │ for use in    │
│ Files         │──────> Agent-based   │──────> Files/Folders │──────> applications   │
└───────────────┘      └───────────────┘      └───────────────┘      └───────────────┘
```

This diagram shows how data flows from its source, through a connection method, and specific syncs into Phoenix where it becomes available for use.
