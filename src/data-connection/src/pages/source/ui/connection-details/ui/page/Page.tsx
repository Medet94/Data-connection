import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import {
  TextInput,
  Group,
  Text,
  Breadcrumbs,
  Anchor,
  Button,
  Card,
  Badge,
  Title,
  Grid,
  Loader,
  Center,
  Divider,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import { ConnectorTypesResponse, ConnectorType } from '#/shared/types';

import {
  pageMounted,
  pageUnmounted,
  connectorSelected,
  $selectedConnector,
  $connectorParameters,
  $parametersLoading,
} from '../../model';

import styles from './styles.module.css';
import { dataConnectionApi } from '#shared/api/index.js';

const route = 'new-connection';

const Page = () => {
  const [value, setValue] = useState<string>('');
  const [connectorData, setConnectorData] = useState<ConnectorType[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [
    mountPage,
    unmountPage,
    selectConnector,
    selectedConnector,
    connectorParameters,
    parametersLoading,
  ] = useUnit([
    pageMounted,
    pageUnmounted,
    connectorSelected,
    $selectedConnector,
    $connectorParameters,
    $parametersLoading,
  ]);

  const handleSourceSelect = (sourceType: string) => {
    navigate(`/data-connection/new-connection/${sourceType.toLowerCase()}/1`);
  };

  const handleConnectorSelect = (connector: ConnectorType) => {
    selectConnector(connector);
    handleSourceSelect(connector.type);
  };

  const handleInput = (val: string) => {
    setValue(val);
  };

  const groupConnectorsByGroup = (connectors: ConnectorType[]) => {
    return connectors.reduce(
      (acc, connector) => {
        if (!acc[connector.group]) {
          acc[connector.group] = [];
        }
        acc[connector.group].push(connector);
        return acc;
      },
      {} as Record<string, ConnectorType[]>
    );
  };

  const filteredConnectors = connectorData?.filter(
    (connector) =>
      connector.name?.toLowerCase().includes(value.toLowerCase()) ||
      connector.description?.toLowerCase().includes(value.toLowerCase())
  );

  const groupedConnectors = groupConnectorsByGroup(filteredConnectors);

  const renderConnectorCard = (connector: ConnectorType) => (
    <Grid.Col span={3} key={connector.type}>
      <Card
        className={styles.sourceOption}
        withBorder
        onClick={() => handleConnectorSelect(connector)}
        style={{ cursor: 'pointer', opacity: connector.isAvailable ? 1 : 0.6 }}
      >
        <Group>
          <div className={styles.group}>
            {connector.type.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <Text fw={500} size="sm">
              {connector.name}
            </Text>
            <Text size="xs" c="dimmed">
              {connector.description}
            </Text>
          </div>
        </Group>
        <Group mt="xs" gap="xs">
          <Badge variant="outline" size="xs">
            {connector.group}
          </Badge>
          {connector.isAvailable ? (
            <Badge variant="outline" size="xs" color="green">
              Available
            </Badge>
          ) : (
            <Badge variant="outline" size="xs" color="red">
              Unavailable
            </Badge>
          )}
        </Group>
      </Card>
    </Grid.Col>
  );

  useEffect(() => {
    const fetchConnectorTypes = async () => {
      try {
        setLoading(true);
        const response = await dataConnectionApi.get<ConnectorTypesResponse>(
          '/api/v1/Connection/connector-types'
        );
        if (response.data.status === 'success') {
          setConnectorData(response.data.data.connectors);
        }
      } catch (error) {
        console.error('Failed to fetch connector types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnectorTypes();
  }, []);

  return (
    <div className={styles.projectsSpace}>
      {/* Navbar */}
      <div className={styles.navbar}>
        <div className={styles.navbarContent}>
          {/* Logo Section */}
          <div className={styles.logoContainer}>
            <BluePrintIcon name="database" size={22} />
          </div>

          {/* Breadcrumb Navigation */}
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs separator=">" className={styles.breadcrumbs}>
              <Anchor className={styles.breadcrumbItem}>Data Connection</Anchor>
              <Text className={styles.breadcrumbItem}>New Connection</Text>
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.actionBar}>
          <Button variant="subtle" size="sm" className={styles.backButton}>
            ←
          </Button>

          <div className={styles.sourceHeader}>
            <BluePrintIcon name="database" size={16} />
            <div>
              <Text size="sm" fw={500}>
                Untitled source
              </Text>
              <Text size="xs" c="dimmed">
                Select your source type
              </Text>
            </div>
          </div>

          <div className={styles.spacer}></div>

          <Button variant="default" size="sm" onClick={() => navigate('../')}>
            Cancel
          </Button>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.section}>
            <Title order={3} size="md" className={styles.sectionTitle}>
              Sources
            </Title>
            <Text size="sm" c="dimmed" className={styles.sectionDescription}>
              To connect to data from the internet or an on-premises source,
              select from the listed source types.
            </Text>

            <TextInput
              placeholder="Search connectors..."
              className={styles.searchInput}
              onChange={(value) => handleInput(value.target.value)}
              mb="md"
            />

            {loading ? (
              <Center py="xl">
                <Loader size="md" />
              </Center>
            ) : (
              <>
                {Object.entries(groupedConnectors).map(
                  ([groupName, connectors], index) => (
                    <div key={groupName}>
                      {index > 0 && <Divider my="xl" />}
                      <div className={styles.section}>
                        <Title
                          order={4}
                          size="sm"
                          className={styles.sectionTitle}
                          mb="sm"
                        >
                          {groupName}
                        </Title>
                        <Grid>{connectors.map(renderConnectorCard)}</Grid>
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConnectionDetails = {
  route,
  Page,
};
