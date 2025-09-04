import {
  Stack,
  Button,
  Card,
  Text,
  Group,
  Divider,
  Badge,
  List,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import { Resource } from '#/shared/types';
import styles from './styles.module.css';

interface ActionsPanelProps {
  selectedResource: Resource | null;
}

export const ActionsPanel = ({ selectedResource }: ActionsPanelProps) => {
  if (!selectedResource) {
    return (
      <Stack gap={16}>
        <Card withBorder>
          <Text c="dimmed" ta="center" py={20}>
            Select a resource to see available actions
          </Text>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack gap={16}>
      {/* Quick Actions */}
      <Card withBorder>
        <Stack gap={12}>
          <Group gap={8}>
            <BluePrintIcon name="flash" size={16} />
            <Text fw={500} size="sm">
              Quick Actions
            </Text>
          </Group>

          <Stack gap={8}>
            <Button
              fullWidth
              leftSection={<BluePrintIcon name="plus" size={14} />}
            >
              Create Sync
            </Button>

            <Button
              variant="outline"
              fullWidth
              leftSection={<BluePrintIcon name="cog" size={14} />}
            >
              Configure Mapping
            </Button>

            <Button
              variant="outline"
              fullWidth
              leftSection={<BluePrintIcon name="download" size={14} />}
            >
              Export Data
            </Button>
          </Stack>
        </Stack>
      </Card>

      {/* Resource Information */}
      <Card withBorder>
        <Stack gap={12}>
          <Group gap={8}>
            <BluePrintIcon name="info-sign" size={16} />
            <Text fw={500} size="sm">
              Resource Information
            </Text>
          </Group>

          <Stack gap={8}>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Type:
              </Text>
              <Badge variant="light" size="sm">
                {selectedResource.type}
              </Badge>
            </Group>

            {selectedResource.schema && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Schema:
                </Text>
                <Text size="sm">{selectedResource.schema}</Text>
              </Group>
            )}

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Rows:
              </Text>
              <Text size="sm">
                {selectedResource.rowCount?.toLocaleString()}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Columns:
              </Text>
              <Text size="sm">{selectedResource.columnCount}</Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Size:
              </Text>
              <Text size="sm">{selectedResource.size}</Text>
            </Group>

            {selectedResource.lastUpdated && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Last Updated:
                </Text>
                <Text size="sm">
                  {selectedResource.lastUpdated.toLocaleDateString()}
                </Text>
              </Group>
            )}
          </Stack>
        </Stack>
      </Card>

      {/* Sync Recommendations */}
      <Card withBorder>
        <Stack gap={12}>
          <Group gap={8}>
            <BluePrintIcon name="lightbulb" size={16} />
            <Text fw={500} size="sm">
              Sync Recommendations
            </Text>
          </Group>

          <Text size="sm" c="dimmed">
            Based on this resource type and size, we recommend:
          </Text>

          <List size="sm" spacing={4}>
            <List.Item>
              <Text size="sm">Daily incremental sync</Text>
            </List.Item>
            <List.Item>
              <Text size="sm">Snapshot transaction type</Text>
            </List.Item>
            <List.Item>
              <Text size="sm">Parquet output format</Text>
            </List.Item>
          </List>

          <Button variant="light" size="sm" fullWidth>
            Apply Recommendations
          </Button>
        </Stack>
      </Card>

      {/* Preview Options */}
      <Card withBorder>
        <Stack gap={12}>
          <Group gap={8}>
            <BluePrintIcon name="eye-open" size={16} />
            <Text fw={500} size="sm">
              Preview Options
            </Text>
          </Group>

          <Stack gap={6}>
            <Button variant="subtle" size="xs" fullWidth justify="flex-start">
              <Group gap={8}>
                <BluePrintIcon name="refresh" size={12} />
                <Text size="xs">Refresh Data</Text>
              </Group>
            </Button>

            <Button variant="subtle" size="xs" fullWidth justify="flex-start">
              <Group gap={8}>
                <BluePrintIcon name="filter" size={12} />
                <Text size="xs">Apply Filters</Text>
              </Group>
            </Button>

            <Button variant="subtle" size="xs" fullWidth justify="flex-start">
              <Group gap={8}>
                <BluePrintIcon name="sort" size={12} />
                <Text size="xs">Sort Columns</Text>
              </Group>
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};
