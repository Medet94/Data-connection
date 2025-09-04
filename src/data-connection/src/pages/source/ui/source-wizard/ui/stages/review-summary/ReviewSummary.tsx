import React from 'react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { Stack, Title, Text, Button, Card, Group } from '@mantine/core';
import { createSourceFx } from '../../../model';
import styles from './styles.module.css';

export const ReviewSummary: React.FC = () => {
  const navigate = useNavigate();

  const [isCreating, createResult] = useUnit([
    createSourceFx.pending,
    createSourceFx.doneData,
  ]);

  return (
    <div className={styles.stageContainer}>
      <Stack gap={24}>
        <div className={styles.header}>
          <Title order={2} className={styles.title}>
            Summary
          </Title>
        </div>

        <Card withBorder radius="md" className={styles.nextStepsCard}>
          <Stack gap={20}>
            <Title order={4} size="md">
              What to do next
            </Title>

            <Group grow align="stretch" gap={16}>
              <Card withBorder className={styles.actionBlock} p="lg">
                <Stack gap={12} h="100%">
                  <Text fw={600} size="sm">
                    Explore and import Source data to a Phoenix dataset
                  </Text>
                  <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                    Explore the data available on this Source and select data to
                    synchronize into a Phoenix dataset
                  </Text>
                  <Button
                    variant="filled"
                    size="sm"
                    onClick={() =>
                      navigate(
                        `/explore/${createResult?.sourceId || 'mock-id'}`
                      )
                    }
                  >
                    Explore
                  </Button>
                </Stack>
              </Card>

              <Card withBorder className={styles.actionBlock} p="lg">
                <Stack gap={12} h="100%">
                  <Text fw={600} size="sm">
                    Go to Source page
                  </Text>
                  <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                    Monitor Source health and syncs, and set up other types of
                    syncs
                  </Text>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(
                        `/source-details/${createResult?.sourceId || 'mock-id'}`
                      )
                    }
                  >
                    Open Source
                  </Button>
                </Stack>
              </Card>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
};
