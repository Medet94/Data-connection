import { useState } from 'react';
import { useUnit } from 'effector-react';
import {
  Stack,
  Text,
  Group,
  ActionIcon,
  Breadcrumbs,
  Anchor,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import { SearchBox } from '#/shared/ui';
import { Resource } from '#/shared/types';
import { mockResources } from '#/shared/mock-data';

import {
  resourceSelected,
  searchQueryChanged,
  $searchQuery,
  $selectedResource,
} from '../../model';

import styles from './styles.module.css';

interface ResourceBrowserProps {
  sourceId?: string;
}

export const ResourceBrowser = ({ sourceId }: ResourceBrowserProps) => {
  const [selectResource, updateSearchQuery] = useUnit([
    resourceSelected,
    searchQueryChanged,
  ]);
  const [searchQuery, selectedResource] = useUnit([
    $searchQuery,
    $selectedResource,
  ]);

  const [expandedNodes, setExpandedNodes] = useState<string[]>([
    'public',
    'analytics',
  ]);

  const handleResourceClick = (resource: Resource) => {
    selectResource(resource);
  };

  const handleSearchChange = (query: string) => {
    updateSearchQuery(query);
  };

  // Group resources by schema
  const groupedResources = mockResources.reduce(
    (acc, resource) => {
      const schema = resource.schema || 'default';
      if (!acc[schema]) {
        acc[schema] = [];
      }
      acc[schema].push(resource);
      return acc;
    },
    {} as Record<string, Resource[]>
  );

  const filteredResources = Object.entries(groupedResources).reduce(
    (acc, [schema, resources]) => {
      const filtered = resources.filter((resource) =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[schema] = filtered;
      }
      return acc;
    },
    {} as Record<string, Resource[]>
  );

  return (
    <div className={styles.resourceBrowser}>
      <Stack gap={16} p={16}>
        {/* Breadcrumbs */}
        <Breadcrumbs separator=">" size="sm">
          <Anchor size="sm" c="dimmed">
            Customer Database
          </Anchor>
          <Text size="sm">Resources</Text>
        </Breadcrumbs>

        {/* Search */}
        <SearchBox
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search resources..."
          size="sm"
        />

        {/* Resource Tree */}
        <Stack gap={8}>
          {Object.entries(filteredResources).map(([schema, resources]) => (
            <div key={schema} className={styles.schemaGroup}>
              {/* Schema Header */}
              <Group
                gap={8}
                className={styles.schemaHeader}
                onClick={() => {
                  setExpandedNodes((prev) =>
                    prev.includes(schema)
                      ? prev.filter((node) => node !== schema)
                      : [...prev, schema]
                  );
                }}
              >
                <ActionIcon variant="transparent" size="xs">
                  <BluePrintIcon
                    name={
                      expandedNodes.includes(schema)
                        ? 'chevron-down'
                        : 'chevron-right'
                    }
                    size={12}
                  />
                </ActionIcon>
                <BluePrintIcon name="folder-close" size={14} />
                <Text size="sm" fw={500}>
                  {schema}
                </Text>
                <Text size="xs" c="dimmed">
                  ({resources.length})
                </Text>
              </Group>

              {/* Resources */}
              {expandedNodes.includes(schema) && (
                <Stack gap={4} ml={20}>
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className={`${styles.resourceItem} ${
                        selectedResource?.id === resource.id
                          ? styles.selected
                          : ''
                      }`}
                      onClick={() => handleResourceClick(resource)}
                    >
                      <Group gap={8} wrap="nowrap">
                        <BluePrintIcon
                          name={resource.type === 'table' ? 'th' : 'eye-open'}
                          size={14}
                        />
                        <div className={styles.resourceInfo}>
                          <Text size="sm" className={styles.resourceName}>
                            {resource.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {resource.rowCount?.toLocaleString()} rows
                          </Text>
                        </div>
                      </Group>
                    </div>
                  ))}
                </Stack>
              )}
            </div>
          ))}
        </Stack>

        {Object.keys(filteredResources).length === 0 && searchQuery && (
          <Text size="sm" c="dimmed" ta="center" py={20}>
            No resources found matching "{searchQuery}"
          </Text>
        )}
      </Stack>
    </div>
  );
};
