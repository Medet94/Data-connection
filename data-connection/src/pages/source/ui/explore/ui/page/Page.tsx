import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import {
  Container,
  Grid,
  Stack,
  Title,
  Text,
  Card,
  Group,
  Button,
  Center,
  Divider,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import { LoadingState, StatusIndicator } from '#/shared/ui';

import { ResourceBrowser } from '../resource-browser';
import { DataPreview } from '../data-preview';
import { ActionsPanel } from '../actions-panel';
import { TableDetailsModal } from '../table-details-modal';

import {
  pageMounted,
  pageUnmounted,
  resourceSelected,
  $isPageMounted,
  $selectedResource,
  $isLoadingData,
  $resourceData,
  $isTableConfigOpen,
} from '../../model';

import styles from './styles.module.css';
const route = 'explore/:sourceId';

const Page = () => {
  const { sourceId } = useParams<{ sourceId: string }>();

  const [
    mountPage,
    unmountPage,
    selectResource,
    isPageMounted,
    selectedResource,
    isLoadingData,
    resourceData,
    isTableConfigOpen,
  ] = useUnit([
    pageMounted,
    pageUnmounted,
    resourceSelected,
    $isPageMounted,
    $selectedResource,
    $isLoadingData,
    $resourceData,
    $isTableConfigOpen,
  ]);

  useEffect(() => {
    mountPage();
    return () => unmountPage();
  }, [mountPage, unmountPage]);

  const renderMainContent = () => {
    if (!selectedResource) {
      return (
        <Center h={400}>
          <Stack align="center" gap={24}>
            <BluePrintIcon name="database" size={48} />
            <div>
              <Title order={4} ta="center" mb={8}>
                Welcome to Data Explorer
              </Title>
              <Text c="dimmed" ta="center">
                Select a resource from the left sidebar to preview its contents.
              </Text>
            </div>
          </Stack>
        </Center>
      );
    }

    if (isLoadingData) {
      return (
        <LoadingState message="Retrieving resource information..." fullHeight />
      );
    }

    return (
      <Stack gap={16}>
        {/* Resource Header */}
        <Card withBorder>
          <Group justify="space-between" align="flex-start">
            <div>
              <Group gap={8} mb={4}>
                <BluePrintIcon name="th" size={16} />
                <Title order={4}>{selectedResource.name}</Title>
                <StatusIndicator status="active" variant="dot" />
              </Group>
              <Group gap={16} mb={8}>
                <Text size="sm" c="dimmed">
                  Type: {selectedResource.type}
                </Text>
                {selectedResource.schema && (
                  <Text size="sm" c="dimmed">
                    Schema: {selectedResource.schema}
                  </Text>
                )}
              </Group>
              <Group gap={16}>
                <Text size="sm">
                  <Text span fw={500}>
                    Rows:
                  </Text>{' '}
                  {selectedResource.rowCount?.toLocaleString()}
                </Text>
                <Text size="sm">
                  <Text span fw={500}>
                    Columns:
                  </Text>{' '}
                  {selectedResource.columnCount}
                </Text>
                <Text size="sm">
                  <Text span fw={500}>
                    Size:
                  </Text>{' '}
                  {selectedResource.size}
                </Text>
              </Group>
            </div>

            <Group gap={8}>
              <Button
                variant="outline"
                size="sm"
                leftSection={<BluePrintIcon name="cog" size={14} />}
              >
                Table Settings
              </Button>
              <Button
                size="sm"
                leftSection={<BluePrintIcon name="plus" size={14} />}
              >
                Create Sync
              </Button>
            </Group>
          </Group>
        </Card>

        {/* Data Preview */}
        <DataPreview data={resourceData} />
      </Stack>
    );
  };

  return (
    <div className={styles.explorePage}>
      {/* Header */}
      <div className={styles.header}>
        <Container size="xl">
          <Group justify="space-between" align="center" h={60}>
            <div>
              <Group gap={8}>
                <BluePrintIcon name="search" size={20} />
                <Title order={3}>Data Explorer</Title>
              </Group>
              <Text size="sm" c="dimmed">
                Browse and configure data resources
              </Text>
            </div>

            <Button
              variant="outline"
              leftSection={<BluePrintIcon name="arrow-left" size={14} />}
            >
              Back to Source
            </Button>
          </Group>
        </Container>
      </div>

      <Divider />

      {/* Main Content */}
      <Container size="xl" className={styles.mainContainer}>
        <Grid gutter={0} className={styles.mainGrid}>
          {/* Left Sidebar - Resource Browser */}
          <Grid.Col span={3} className={styles.sidebar}>
            <ResourceBrowser sourceId={sourceId} />
          </Grid.Col>

          {/* Main Content Area */}
          <Grid.Col span={6} className={styles.mainContent}>
            {renderMainContent()}
          </Grid.Col>

          {/* Right Sidebar - Actions Panel */}
          <Grid.Col span={3} className={styles.actionsPanel}>
            <ActionsPanel selectedResource={selectedResource} />
          </Grid.Col>
        </Grid>
      </Container>

      {/* Table Details Modal */}
      {isTableConfigOpen && <TableDetailsModal />}
    </div>
  );
};

export const Explore = {
  route,
  Page,
};
