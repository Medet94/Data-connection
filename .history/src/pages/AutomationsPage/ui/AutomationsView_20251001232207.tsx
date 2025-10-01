import React, { useEffect, useState } from 'react';
import { Card, Stack, Text, Group, Loader, Center } from '@mantine/core';
import { fetchAutomations } from '../../entities/automation/api';
import { Automation } from '../../entities/automation/types';

const AutomationsView: React.FC<{ refreshTrigger?: number }> = ({
  refreshTrigger,
}) => {
  const [items, setItems] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAutomations();
        if (!mounted) return;
        setItems(res);
      } catch (e: any) {
        console.error(e);
        if (!mounted) return;
        setError(e?.message || 'Unknown error');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [refreshTrigger]);

  if (loading)
    return (
      <Center style={{ padding: 40 }}>
        <Loader />
      </Center>
    );
  if (error)
    return (
      <Card shadow="xs" p="md">
        <Text color="red">Error loading automations: {error}</Text>
      </Card>
    );

  return (
    <Stack>
      {items.map((item) => (
        <Card key={item.id} shadow="xs" padding="md">
          <Group position="apart" align="flex-start">
            <div>
              <Text weight={600}>{item.name}</Text>
              <Text size="xs" color="dimmed">{`Expiry: ${new Date(
                item.expiry_date || ''
              ).toLocaleDateString()}`}</Text>
            </div>
            <Text size="sm" color={item.is_active ? 'teal' : 'dimmed'}>
              {item.is_active ? 'Active' : 'Inactive'}
            </Text>
          </Group>
        </Card>
      ))}
      {items.length === 0 && <Text color="dimmed">No automations found</Text>}
    </Stack>
  );
};

export default AutomationsView;
