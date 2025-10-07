import React, { useEffect, useState } from 'react';
import { Card, Stack, TextInput, Group, Checkbox, Text } from '@mantine/core';
import { fetchAutomations } from '../entities/automation/api';
import type { Automation } from '../../entities/automation/types';

export const FiltersPanel: React.FC<{ refreshTrigger?: number }> = ({
  refreshTrigger,
}) => {
  const [activeCount, setActiveCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const items = await fetchAutomations();
        if (!mounted) return;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setActiveCount(items.filter((i) => i.is_active).length);
        setExpiredCount(
          items.filter((i) => new Date(i.expiry_date || 0) < today).length
        );
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [refreshTrigger]);

  return (
    <Card shadow="sm" p="md">
      <Stack>
        <TextInput placeholder="Search" />
        <Group position="apart">
          <Text weight={500}>Status</Text>
        </Group>
        <Group position="apart">
          <Checkbox label="Active" />
          <Text size="sm" color="dimmed">
            {activeCount}
          </Text>
        </Group>
        <Group position="apart">
          <Checkbox label="Expired" />
          <Text size="sm" color="dimmed">
            {expiredCount}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};

export default FiltersPanel;
