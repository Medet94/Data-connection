import { Modal, Tabs, Stack } from '@mantine/core';
import { useUnit } from 'effector-react';
import { tableConfigClosed, $isTableConfigOpen } from '../../model';

export const TableDetailsModal = () => {
  const [closeModal] = useUnit([tableConfigClosed]);
  const [isOpen] = useUnit([$isTableConfigOpen]);

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title="Table Details"
      size="xl"
    >
      <Tabs defaultValue="mapping">
        <Tabs.List>
          <Tabs.Tab value="mapping">Mapping</Tabs.Tab>
          <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="mapping" pt="md">
          <Stack>
            {/* Column mapping content would go here */}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="advanced" pt="md">
          <Stack>
            {/* Advanced settings content would go here */}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};