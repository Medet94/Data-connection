// Sample connectorParameters array based on ConnectorParameter interface
// This demonstrates the structure used in ConfigureDetails.tsx component

export const connectorParameters = [
  {
    name: "host",
    type: "string" as const,
    required: true,
    defaultValue: "localhost",
    description: "Database server hostname or IP address",
    isSecure: false,
    options: null
  },
  {
    name: "port",
    type: "integer" as const,
    required: false,
    defaultValue: 5432,
    description: "Port number for database connection",
    isSecure: false,
    options: null
  },
  {
    name: "database",
    type: "string" as const,
    required: true,
    defaultValue: null,
    description: "Name of the database to connect to",
    isSecure: false,
    options: null
  },
  {
    name: "username",
    type: "string" as const,
    required: true,
    defaultValue: null,
    description: "Database username for authentication",
    isSecure: false,
    options: null
  },
  {
    name: "password",
    type: "password" as const,
    required: true,
    defaultValue: null,
    description: "Password for database authentication",
    isSecure: true,
    options: null
  },
  {
    name: "sslMode",
    type: "select" as const,
    required: false,
    defaultValue: "disable",
    description: "SSL connection mode for secure connections",
    isSecure: false,
    options: [
      { value: "disable", label: "Disable SSL" },
      { value: "require", label: "Require SSL" },
      { value: "prefer", label: "Prefer SSL" },
      { value: "verify-ca", label: "Verify Certificate Authority" },
      { value: "verify-full", label: "Verify Full Certificate" }
    ]
  },
  {
    name: "useConnectionPool",
    type: "boolean" as const,
    required: false,
    defaultValue: true,
    description: "Enable connection pooling for better performance",
    isSecure: false,
    options: null
  },
  {
    name: "connectionTimeout",
    type: "integer" as const,
    required: false,
    defaultValue: 30,
    description: "Connection timeout in seconds",
    isSecure: false,
    options: null
  },
  {
    name: "schema",
    type: "string" as const,
    required: false,
    defaultValue: "public",
    description: "Default schema to use for queries",
    isSecure: false,
    options: null
  }
];