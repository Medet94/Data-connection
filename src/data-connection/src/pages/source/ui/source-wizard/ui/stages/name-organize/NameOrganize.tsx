import React, { useState } from 'react';
import { useUnit } from 'effector-react';
import {
  Stack,
  Title,
  Text,
  Button,
  Card,
  Group,
  TextInput,
  Modal,
  Divider,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import {
  connectionNameUpdated,
  projectSelected,
  $connectionName,
  $selectedProject,
} from '../../../model';
import styles from './styles.module.css';

interface NameOrganizeProps {
  onContinue?: () => void;
}

export const NameOrganize: React.FC<NameOrganizeProps> = ({ onContinue }) => {
  const [updatedConnectionName, selectProject] = useUnit([
    connectionNameUpdated,
    projectSelected,
  ]);
  const [connectionName, selectedProject] = useUnit([
    $connectionName,
    $selectedProject,
  ]);

  const [localName, setLocalName] = useState(
    connectionName === 'Untitled' ? '' : connectionName
  );
  const [showProjectBrowser, setShowProjectBrowser] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const handleNameChange = (value: string) => {
    setLocalName(value);
    updatedConnectionName(value || 'Untitled');
  };

  return (
    <div className={styles.stageContainer}>
      <Stack gap={24}>
        <div className={styles.header}>
          <Title order={2} className={styles.title}>
            Name and project
          </Title>
        </div>

        <Card withBorder radius="md" className={styles.formCard}>
          <Stack gap={16}>
            <Title order={4} size="md">
              Source Name
            </Title>
            <TextInput
              label="Connection Name"
              placeholder="Enter a descriptive name for this connection"
              value={localName}
              onChange={(e) => handleNameChange(e.target.value)}
              description="Provide a unique, distinguishable source name that differs from other resources in this location"
              required
              size="md"
            />
          </Stack>
        </Card>

        <Card withBorder radius="md" className={styles.formCard}>
          <Stack gap={16}>
            <Title order={4} size="md">
              Project Location
            </Title>
            <Text size="sm" c="dimmed">
              Select where this source will be stored in Phoenix
            </Text>

            {selectedProject ? (
              <Card withBorder className={styles.selectedProject}>
                <Group justify="space-between">
                  <div>
                    <Group>
                      <BluePrintIcon name="folder-close" size={20} />
                      <div>
                        <Text fw={500}>{selectedProject.name}</Text>
                        <Text size="sm" c="dimmed">
                          {selectedProject.path}
                        </Text>
                      </div>
                    </Group>
                  </div>
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => setShowProjectBrowser(true)}
                  >
                    Change
                  </Button>
                </Group>
              </Card>
            ) : (
              <Group gap="md">
                <Button
                  variant="outline"
                  onClick={() => setShowProjectBrowser(true)}
                  leftSection={<BluePrintIcon name="folder-open" size={16} />}
                >
                  Select Existing Project
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateProject(true)}
                  leftSection={<BluePrintIcon name="plus" size={16} />}
                >
                  Create New Project
                </Button>
              </Group>
            )}
          </Stack>
        </Card>
      </Stack>

      <Modal
        opened={showProjectBrowser}
        onClose={() => setShowProjectBrowser(false)}
        title="Select Project Location"
        size="lg"
      >
        <Stack gap={16}>
          <Text size="sm" c="dimmed">
            Choose an existing project to store your data source
          </Text>

          <Divider />

          <Group>
            <Button
              variant="outline"
              onClick={() => {
                setShowProjectBrowser(false);
                setShowCreateProject(true);
              }}
              leftSection={<BluePrintIcon name="plus" size={16} />}
            >
              Create New Project
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        title="Create New Project"
        size="md"
      >
        <Stack gap={16}>
          <TextInput
            label="Project Name"
            placeholder="Enter project name"
            required
          />

          <TextInput
            label="Description"
            placeholder="Brief description of the project (optional)"
          />

          <Group justify="flex-end">
            <Button
              variant="subtle"
              onClick={() => setShowCreateProject(false)}
            >
              Cancel
            </Button>
            <Button>Create Project</Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
};
