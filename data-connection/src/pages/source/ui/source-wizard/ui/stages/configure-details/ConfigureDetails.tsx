import React, { useState, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from '@mantine/form';
import {
  Stack,
  Title,
  Text,
  Button,
  Card,
  Group,
  TextInput,
  PasswordInput,
  NumberInput,
  Switch,
  Loader,
  Alert,
  Badge,
  Tabs,
  Select,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import {
  connectionDetailsUpdated,
  $connectionDetails,
  testConnectionFx,
} from '../../../model';
import styles from './styles.module.css';

import {
  pageMounted,
  pageUnmounted,
  connectorSelected,
  $selectedConnector,
  $connectorParameters,
  $parametersLoading,
} from '../../../../../../source/ui/connection-details/model';

interface ConfigureDetailsProps {
  onContinue?: () => void;
}

export const ConfigureDetails: React.FC<ConfigureDetailsProps> = ({
  onContinue,
}) => {
  const [updateConnectionDetails] = useUnit([connectionDetailsUpdated]);
  const [connectionDetails] = useUnit([$connectionDetails]);

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

  const getInitialValues = () => {
    const initialValues: Record<string, any> = {};
    connectorParameters.forEach((param) => {
      const existingValue = connectionDetails[param.name];
      const defaultValue = param.defaultValue;

      // Handle different parameter types properly
      switch (param.type) {
        case 'boolean':
          initialValues[param.name] =
            existingValue !== undefined
              ? existingValue
              : (defaultValue ?? false);
          break;
        case 'integer':
          initialValues[param.name] =
            existingValue !== undefined ? existingValue : (defaultValue ?? 0);
          break;
        case 'select':
          initialValues[param.name] =
            existingValue !== undefined ? existingValue : (defaultValue ?? '');
          break;
        case 'string':
        case 'password':
        default:
          initialValues[param.name] =
            existingValue !== undefined ? existingValue : (defaultValue ?? '');
          break;
      }
    });
    return initialValues;
  };

  const form = useForm({
    initialValues: getInitialValues(),
  });

  useEffect(() => {
    const newValues = getInitialValues();
    form.setValues(newValues);
  }, [connectorParameters, connectionDetails]);

  const [previewData, setPreviewData] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'testing' | 'success' | 'failed'
  >('idle');

  const [isPreviewPanelOpen, setIsPreviewPanelOpen] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    form.setFieldValue(field, value);
    updateConnectionDetails({ ...form.values, [field]: value });
  };

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    try {
      const result = await testConnectionFx({
        sourceType: selectedConnector?.type,
        connectionDetails: form.values,
      });

      if (result.success) {
        setConnectionStatus('success');
        setPreviewData(result.previewData);
      } else {
        setConnectionStatus('failed');
      }
    } catch (error) {
      setConnectionStatus('failed');
    }
  };

  console.log('Connector parameters', connectorParameters);

  return (
    <div className={styles.stageContainer}>
      <div
        className={`${styles.mainLayout} ${isPreviewPanelOpen ? styles.panelOpen : styles.panelClosed}`}
      >
        <div className={styles.mainContent}>
          <Stack gap={24}>
            <div className={styles.header}>
              <Group justify="space-between" align="center">
                <Title order={2} className={styles.title}>
                  Connection details
                </Title>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreviewPanelOpen(!isPreviewPanelOpen)}
                  leftSection={
                    <BluePrintIcon
                      name={isPreviewPanelOpen ? 'panel-stats' : 'eye-open'}
                      size={16}
                    />
                  }
                  className={styles.toggleButton}
                >
                  {isPreviewPanelOpen ? 'Hide Preview' : 'Show Preview'}
                </Button>
              </Group>
            </div>

            <Card withBorder radius="md" className={styles.formCard}>
              <Stack gap={16}>
                <Title order={4} size="md">
                  {selectedConnector?.name || 'Database'} Connection
                </Title>

                {parametersLoading ? (
                  <Group justify="center" py="xl">
                    <Loader size="md" />
                    <Text>Loading connector parameters...</Text>
                  </Group>
                ) : connectorParameters.length > 0 ? (
                  <form onSubmit={form.onSubmit(() => {})}>
                    <Stack gap={16}>
                      {connectorParameters.map((param) => {
                        switch (param.type) {
                          case 'string':
                            return (
                              <TextInput
                                key={param.name}
                                label={
                                  param.name.charAt(0).toUpperCase() +
                                  param.name.slice(1)
                                }
                                description={param.description}
                                required={param.required}
                                value={
                                  form.values[param.name] ??
                                  param.defaultValue ??
                                  ''
                                }
                                onChange={(e) => {
                                  const value = e.currentTarget.value;
                                  form.setFieldValue(param.name, value);
                                  handleInputChange(param.name, value);
                                }}
                                placeholder={
                                  param.defaultValue
                                    ? String(param.defaultValue)
                                    : undefined
                                }
                              />
                            );

                          case 'password':
                            return (
                              <PasswordInput
                                key={param.name}
                                label={
                                  param.name.charAt(0).toUpperCase() +
                                  param.name.slice(1)
                                }
                                description={param.description}
                                required={param.required}
                                value={
                                  form.values[param.name] ??
                                  param.defaultValue ??
                                  ''
                                }
                                onChange={(e) => {
                                  const value = e.currentTarget.value;
                                  form.setFieldValue(param.name, value);
                                  handleInputChange(param.name, value);
                                }}
                                placeholder="Enter password"
                              />
                            );

                          case 'integer':
                            return (
                              <NumberInput
                                key={param.name}
                                label={
                                  param.name.charAt(0).toUpperCase() +
                                  param.name.slice(1)
                                }
                                description={param.description}
                                required={param.required}
                                value={
                                  form.values[param.name] ??
                                  param.defaultValue ??
                                  ''
                                }
                                onChange={(value) => {
                                  form.setFieldValue(param.name, value);
                                  handleInputChange(param.name, value);
                                }}
                                placeholder={
                                  param.defaultValue
                                    ? String(param.defaultValue)
                                    : undefined
                                }
                              />
                            );

                          case 'select':
                            return (
                              <Select
                                key={param.name}
                                label={
                                  param.name.charAt(0).toUpperCase() +
                                  param.name.slice(1)
                                }
                                description={param.description}
                                required={param.required}
                                value={
                                  form.values[param.name] ??
                                  param.defaultValue ??
                                  ''
                                }
                                onChange={(value) => {
                                  form.setFieldValue(param.name, value);
                                  handleInputChange(param.name, value);
                                }}
                                data={
                                  param.options?.map((opt) => ({
                                    value: opt.value,
                                    label: opt.label,
                                  })) || []
                                }
                                placeholder="Select an option"
                              />
                            );

                          case 'boolean':
                            return (
                              <Switch
                                key={param.name}
                                label={
                                  param.name.charAt(0).toUpperCase() +
                                  param.name.slice(1)
                                }
                                description={param.description}
                                checked={form.values[param.name] || false}
                                onChange={(e) => {
                                  const checked = e.currentTarget.checked;
                                  form.setFieldValue(param.name, checked);
                                  handleInputChange(param.name, checked);
                                }}
                              />
                            );

                          default:
                            return (
                              <TextInput
                                key={param.name}
                                label={
                                  param.name.charAt(0).toUpperCase() +
                                  param.name.slice(1)
                                }
                                description={param.description}
                                required={param.required}
                                value={
                                  form.values[param.name] ??
                                  param.defaultValue ??
                                  ''
                                }
                                onChange={(e) => {
                                  const value = e.currentTarget.value;
                                  form.setFieldValue(param.name, value);
                                  handleInputChange(param.name, value);
                                }}
                                placeholder={
                                  param.defaultValue
                                    ? String(param.defaultValue)
                                    : undefined
                                }
                              />
                            );
                        }
                      })}

                      {/* Test Connection Button */}
                      <Group justify="flex-end" mt="md">
                        <Button
                          variant="outline"
                          onClick={handleTestConnection}
                          loading={connectionStatus === 'testing'}
                          disabled={
                            !connectorParameters.some(
                              (p) => p.required && form.values[p.name]
                            )
                          }
                          leftSection={<BluePrintIcon name="flash" size={16} />}
                        >
                          Test Connection
                        </Button>
                      </Group>
                    </Stack>
                  </form>
                ) : (
                  <Text c="dimmed" ta="center" py="xl">
                    No connector parameters available. Please select a connector
                    type first.
                  </Text>
                )}
              </Stack>
            </Card>
          </Stack>
        </div>

        {/* Collapsible Right Panel - Source Preview */}
        {isPreviewPanelOpen && (
          <div className={styles.rightPanel}>
            <Card withBorder radius="md" className={styles.previewPanel}>
              <Stack gap={20}>
                {/* Panel Header */}
                <Group justify="space-between" align="flex-start">
                  <Group gap={8}>
                    <BluePrintIcon
                      name="layers"
                      size={16}
                      color="var(--mantine-color-gray-6)"
                    />
                    <Title order={4} size="md" c="gray.7">
                      Previewing source
                    </Title>
                  </Group>
                </Group>

                {connectionStatus === 'idle' && (
                  <div className={styles.previewContent}>
                    <Stack gap={16} align="center">
                      <Text c="dimmed" size="sm" ta="center">
                        These resources are a preview of what can be synced into
                        Foundry.
                      </Text>

                      <Button
                        variant="filled"
                        size="sm"
                        fullWidth
                        onClick={handleTestConnection}
                        leftSection={
                          <BluePrintIcon name="eye-open" size={16} />
                        }
                        className={styles.previewButton}
                      >
                        Preview source
                      </Button>
                    </Stack>
                  </div>
                )}

                {connectionStatus === 'testing' && (
                  <div className={styles.previewLoading}>
                    <Stack gap={16} align="center">
                      <Loader size="sm" />
                      <Text c="dimmed" size="sm" ta="center">
                        Connecting to your data source...
                      </Text>
                    </Stack>
                  </div>
                )}

                {connectionStatus === 'failed' && (
                  <div className={styles.previewError}>
                    <Alert
                      color="red"
                      variant="light"
                      icon={<BluePrintIcon name="error" size={16} />}
                    >
                      <Text size="sm" fw={500} mb={4}>
                        Connection Failed
                      </Text>
                      <Text size="sm" c="dimmed">
                        Unable to connect. Please check your connection details.
                      </Text>
                    </Alert>

                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={handleTestConnection}
                      mt="md"
                      leftSection={<BluePrintIcon name="refresh" size={16} />}
                    >
                      Try again
                    </Button>
                  </div>
                )}

                {connectionStatus === 'success' && previewData && (
                  <div className={styles.previewSuccess}>
                    <Alert
                      color="green"
                      variant="light"
                      icon={<BluePrintIcon name="tick" size={16} />}
                      mb="md"
                    >
                      <Text size="sm" fw={500}>
                        Connection Successful
                      </Text>
                    </Alert>

                    {/* Resource List */}
                    <Stack gap={12}>
                      <Text size="sm" fw={500} c="gray.7">
                        Available Resources
                      </Text>

                      <div className={styles.resourceList}>
                        {previewData.tables?.length > 0 && (
                          <div className={styles.resourceSection}>
                            <Group gap={8} mb={8}>
                              <BluePrintIcon
                                name="th"
                                size={14}
                                color="var(--mantine-color-blue-5)"
                              />
                              <Text size="sm" fw={500} c="gray.7">
                                Tables ({previewData.tables.length})
                              </Text>
                            </Group>

                            <Stack gap={6}>
                              {previewData.tables
                                .slice(0, 5)
                                .map((table: string, index: number) => (
                                  <Group
                                    key={index}
                                    gap={8}
                                    className={styles.resourceItem}
                                  >
                                    <BluePrintIcon
                                      name="th"
                                      size={12}
                                      color="var(--mantine-color-gray-5)"
                                    />
                                    <Text size="xs" c="gray.6">
                                      {table}
                                    </Text>
                                  </Group>
                                ))}
                              {previewData.tables.length > 5 && (
                                <Text size="xs" c="dimmed">
                                  +{previewData.tables.length - 5} more tables
                                </Text>
                              )}
                            </Stack>
                          </div>
                        )}

                        {previewData.schemas?.length > 0 && (
                          <div className={styles.resourceSection}>
                            <Group gap={8} mb={8}>
                              <BluePrintIcon
                                name="folder-close"
                                size={14}
                                color="var(--mantine-color-green-5)"
                              />
                              <Text size="sm" fw={500} c="gray.7">
                                Schemas ({previewData.schemas.length})
                              </Text>
                            </Group>

                            <Stack gap={6}>
                              {previewData.schemas
                                .slice(0, 3)
                                .map((schema: string, index: number) => (
                                  <Group
                                    key={index}
                                    gap={8}
                                    className={styles.resourceItem}
                                  >
                                    <BluePrintIcon
                                      name="folder-close"
                                      size={12}
                                      color="var(--mantine-color-gray-5)"
                                    />
                                    <Text size="xs" c="gray.6">
                                      {schema}
                                    </Text>
                                  </Group>
                                ))}
                              {previewData.schemas.length > 3 && (
                                <Text size="xs" c="dimmed">
                                  +{previewData.schemas.length - 3} more schemas
                                </Text>
                              )}
                            </Stack>
                          </div>
                        )}
                      </div>
                    </Stack>
                  </div>
                )}
              </Stack>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
