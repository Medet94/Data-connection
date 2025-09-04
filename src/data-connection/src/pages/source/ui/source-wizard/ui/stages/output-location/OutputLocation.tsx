import React, { useState } from 'react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Title,
  Text,
  Button,
  Card,
  Group,
  Modal,
  Loader,
  ActionIcon,
  Progress,
  Alert,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import {
  outputLocationSelected,
  $outputLocation,
  $selectedProject,
  $connectionName,
  generateOutputLocationFx,
} from '../../../model';
import styles from './styles.module.css';

interface OutputLocationProps {
  onContinue?: () => void;
}

export const OutputLocation: React.FC<OutputLocationProps> = ({
  onContinue,
}) => {
  const [selectOutputLocation] = useUnit([outputLocationSelected]);
  const [outputLocation, selectedProject, connectionName] = useUnit([
    $outputLocation,
    $selectedProject,
    $connectionName,
  ]);

  const [isGenerating, generatedOutput] = useUnit([
    generateOutputLocationFx.pending,
    generateOutputLocationFx.doneData,
  ]);

  const [showFolderBrowser, setShowFolderBrowser] = useState(false);
  const [showGeneratingDialog, setShowGeneratingDialog] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationItems, setGenerationItems] = useState<any[]>([]);

  const defaultLocation =
    selectedProject && connectionName !== 'Untitled'
      ? `${selectedProject.path}/${connectionName.replace(/[^a-zA-Z0-9-_]/g, '_')}`
      : null;

  const handleGenerate = async () => {
    if (selectedProject && connectionName !== 'Untitled') {
      setShowGeneratingDialog(true);
      setGenerationProgress(0);

      try {
        const result = await generateOutputLocationFx({
          projectPath: selectedProject.path,
          connectionName,
        });

        // Simulate generation progress
        setGenerationItems(result.items);
        for (let i = 0; i <= 100; i += 20) {
          setGenerationProgress(i);
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        selectOutputLocation(result.path);
        setShowGeneratingDialog(false);
      } catch (error) {
        setShowGeneratingDialog(false);
      }
    }
  };

  const handleSelectDifferentFolder = () => {
    setShowFolderBrowser(true);
  };

  const handleContinue = () => {
    if (outputLocation || defaultLocation) {
      onContinue();
    }
  };

  const navigate = useNavigate();

  // Mock folder browser data
  const mockFolders = [
    {
      id: '1',
      name: 'Marketing Analytics',
      path: '/Name Space/Marketing Analytics',
      type: 'project',
    },
    {
      id: '2',
      name: 'data_sources',
      path: '/Name Space/Marketing Analytics/data_sources',
      type: 'folder',
    },
    {
      id: '3',
      name: 'raw_data',
      path: '/Name Space/Marketing Analytics/raw_data',
      type: 'folder',
    },
    {
      id: '4',
      name: 'Financial Reporting',
      path: '/Name Space/Financial Reporting',
      type: 'project',
    },
  ];

  return (
    <div className={styles.stageContainer}>
      <Stack gap={24}>
        {/* Header */}
        <div className={styles.header}>
          <Title order={2} className={styles.title}>
            Output folder
          </Title>
        </div>

        {/* Default Output Folder */}
        <Card withBorder radius="md" className={styles.outputCard}>
          <Stack gap={16}>
            <Group justify="space-between">
              <Title order={4} size="md">
                Default output folder for syncs
              </Title>
            </Group>

            {outputLocation ? (
              <Card withBorder className={styles.selectedFolder}>
                <Group justify="space-between">
                  <Group>
                    <BluePrintIcon
                      name="folder-close"
                      size={24}
                      color="orange"
                    />
                    <div>
                      <Text fw={500}>{outputLocation}</Text>
                      <Text size="sm" c="dimmed">
                        This folder is where new syncs will be placed by default
                      </Text>
                    </div>
                  </Group>
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={handleSelectDifferentFolder}
                  >
                    Change default output folder
                  </Button>
                </Group>
              </Card>
            ) : defaultLocation ? (
              <Card withBorder className={styles.defaultFolder}>
                <Group justify="space-between">
                  <Group>
                    <BluePrintIcon name="folder-close" size={24} />
                    <div>
                      <Text fw={500}>{defaultLocation}</Text>
                      <Text size="sm" c="dimmed">
                        Suggested location based on your project and connection
                        name
                      </Text>
                    </div>
                  </Group>
                  <Group>
                    <Button
                      variant="subtle"
                      size="sm"
                      onClick={handleSelectDifferentFolder}
                    >
                      Select a different folder
                    </Button>
                  </Group>
                </Group>
              </Card>
            ) : (
              <Alert
                variant="light"
                color="gray"
                icon={<BluePrintIcon name="info-sign" size={20} />}
              >
                <Text>
                  Please complete the previous steps (connection name and
                  project selection) to generate the default output folder.
                </Text>
              </Alert>
            )}
          </Stack>
        </Card>

        {/* Output Structure Preview */}
        {outputLocation && (
          <Card withBorder radius="md" className={styles.structureCard}>
            <Stack gap={16}>
              <Title order={4} size="md">
                Folder Structure Preview
              </Title>
              <Text size="sm" c="dimmed">
                The following structure will be created for your data source:
              </Text>

              <div className={styles.folderTree}>
                <div className={styles.treeItem}>
                  <BluePrintIcon name="folder-open" size={16} />
                  <Text size="sm">
                    {connectionName.replace(/[^a-zA-Z0-9-_]/g, '_')}
                  </Text>
                </div>
                <div className={`${styles.treeItem} ${styles.nested}`}>
                  <BluePrintIcon name="folder-close" size={16} />
                  <Text size="sm">raw_data</Text>
                </div>
                <div className={`${styles.treeItem} ${styles.nested}`}>
                  <BluePrintIcon name="folder-close" size={16} />
                  <Text size="sm">processed_data</Text>
                </div>
                <div className={`${styles.treeItem} ${styles.nested}`}>
                  <BluePrintIcon name="document" size={16} />
                  <Text size="sm">config.json</Text>
                </div>
              </div>
            </Stack>
          </Card>
        )}
      </Stack>

      {/* Generating Dialog */}
      <Modal
        opened={showGeneratingDialog}
        onClose={() => {}}
        title="Generating Output Structure"
        size="md"
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <Stack gap={16}>
          <Group>
            <Loader size="sm" />
            <Text>Creating folder structure...</Text>
          </Group>

          <Progress value={generationProgress} size="sm" />

          <div className={styles.generatingItems}>
            {generationItems.map((item, index) => (
              <Group key={index} justify="space-between">
                <Group>
                  <BluePrintIcon
                    name={item.type === 'folder' ? 'folder-close' : 'document'}
                    size={16}
                  />
                  <Text size="sm">{item.name}</Text>
                </Group>
                {item.status === 'new' ? (
                  <Text size="xs" c="blue">
                    +
                  </Text>
                ) : (
                  <Text size="xs" c="green">
                    ✓
                  </Text>
                )}
              </Group>
            ))}
          </div>
        </Stack>
      </Modal>

      {/* Folder Browser Modal */}
      <Modal
        opened={showFolderBrowser}
        onClose={() => setShowFolderBrowser(false)}
        title="Select Output Folder"
        size="lg"
      >
        <Stack gap={16}>
          <Text size="sm" c="dimmed">
            Choose a different location for your synced data
          </Text>

          <div className={styles.foldersList}>
            {mockFolders.map((folder) => (
              <Card
                key={folder.id}
                withBorder
                className={styles.folderItem}
                onClick={() => {
                  selectOutputLocation(folder.path);
                  setShowFolderBrowser(false);
                }}
              >
                <Group>
                  <BluePrintIcon
                    name={
                      folder.type === 'project' ? 'folder-open' : 'folder-close'
                    }
                    size={20}
                  />
                  <div style={{ flex: 1 }}>
                    <Text fw={500}>{folder.name}</Text>
                    <Text size="sm" c="dimmed">
                      {folder.path}
                    </Text>
                  </div>
                  <ActionIcon variant="subtle" size="sm">
                    <BluePrintIcon name="arrow-right" size={16} />
                  </ActionIcon>
                </Group>
              </Card>
            ))}
          </div>
        </Stack>
      </Modal>
    </div>
  );
};
