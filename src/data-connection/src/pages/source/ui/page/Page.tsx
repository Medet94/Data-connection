import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { Stack, Title, Text, Card } from '@mantine/core';
import { LoadingState } from '#/shared/ui';
import { ConnectionCards } from '../connection-cards';
import { RecentConnections } from '../recent-connections';
import { FilterPanel } from '../filter-panel';
import { $connections, getConnectionsFx, $isLoading } from '../../model';

import styles from './styles.module.css';

const route = 'source';

const Page = () => {
  const [connection, loading] = useUnit([$connections, $isLoading]);

  useEffect(() => {
    getConnectionsFx();
  }, []);

  const navigate = useNavigate();

  const handleExternalConnection = () => {
    navigate('../new-connection');
  };

  const handleFileUpload = () => {
    console.log('File upload clicked');
  };

  const handleDataGeneration = () => {
    console.log('Data generation clicked');
  };

  const handleViewAll = () => {
    console.log('View all clicked');
  };

  const handleFilterChange = (filter: string) => {
    console.log('Filter changed to:', filter);
  };

  const handleSeeAll = () => {
    console.log('See all clicked');
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <LoadingState message="Loading connections..." fullHeight />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <Stack gap={15}>
          {/* Welcome Section */}
          <div className={styles.welcomeSection}>
            <Stack gap={15}>
              <Stack gap={8}>
                <Title className={styles.mainTitle}>Data connection</Title>
                <Text className={styles.mainDescription}>
                  Synchronize and manage data flows between Phoenix and external
                  systems.
                </Text>
              </Stack>

              <Card withBorder radius="sm" className={styles.setupCard}>
                <Stack gap={10} align="left">
                  <Title className={styles.setupTitle}>
                    Set up new connections
                  </Title>
                  <ConnectionCards
                    onExternalConnection={handleExternalConnection}
                    onFileUpload={handleFileUpload}
                    onDataGeneration={handleDataGeneration}
                  />
                </Stack>
              </Card>
            </Stack>
          </div>

          <div className={styles.filterPanelSection}>
            <FilterPanel
              onFilterChange={handleFilterChange}
              onSeeAll={handleSeeAll}
            />
          </div>

          <div className={styles.recentConnectionsSection}>
            <RecentConnections
              connections={connection}
              onViewAll={handleViewAll}
            />
          </div>
        </Stack>
      </div>
    </div>
  );
};

export const Source = {
  route: route,
  Page: Page,
};
