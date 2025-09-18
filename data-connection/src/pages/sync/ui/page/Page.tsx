import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Container, Stack, Title, Text, Card } from '@mantine/core';

import { pageMounted, pageUnmounted } from '../../model';

const route = 'sync';

const Page = () => {
  const [mountPage, unmountPage] = useUnit([pageMounted, pageUnmounted]);

  useEffect(() => {
    mountPage();

    return () => unmountPage();
  }, []);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Card withBorder radius="sm" p="xl">
          <Stack gap="md">
            <Title order={2}>Sync Management</Title>
            <Text c="dimmed">
              Monitor and manage data synchronization processes. View sync
              status, schedule automatic syncs, and handle sync conflicts.
            </Text>
            <Text c="dimmed" fs="italic">
              This page is under development. Sync management features will be
              added here.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export const Sync = {
  route,
  Page,
};
