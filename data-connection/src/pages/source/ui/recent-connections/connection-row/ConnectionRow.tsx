import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Group, Text, Stack, Modal, Button } from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import { DataConnection } from '#/shared/types';
import { useUnit } from 'effector-react';
import {
  $deleteModal,
  closeDeleteModal,
  deleteConnectionFx,
} from '../../../model/connections';

import styles from './styles.module.css';

export interface ConnectionRowProps {
  connection: DataConnection;
}

const DeleteConnectionModal = () => {
  const [{ opened, id }, close, deleteFx] = useUnit([
    $deleteModal,
    closeDeleteModal,
    deleteConnectionFx,
  ]);

  return (
    <Modal opened={opened} onClose={close} title="Удалить соединение?">
      <Text>Вы действительно хотите удалить соединение {id}?</Text>

      <Group mt="md" justify="flex-end">
        <Button variant="default" onClick={close}>
          Отмена
        </Button>
        <Button
          color="red"
          loading={deleteFx.pending}
          onClick={() => id && deleteFx(id)}
        >
          Удалить
        </Button>
      </Group>
    </Modal>
  );
};

export const ConnectionRow: React.FC<ConnectionRowProps> = ({ connection }) => {
  const [{ opened, id }, close, deleteFx] = useUnit([
    $deleteModal,
    closeDeleteModal,
    deleteConnectionFx,
  ]);

  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    const dat = new Date(date);

    if (isNaN(dat.getTime())) {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleConnectionClick = (id: string) => {
    console.log(id);
    close(true);
  };

  return (
    <Table.Tr className={styles.tableRow}>
      <Table.Td className={styles.tableCell}>
        <Group
          gap={8}
          onClick={() => handleConnectionClick(connection.id)}
          className={styles.clickableCell}
        >
          <BluePrintIcon name="cloud" size={16} color="#5F6B7C" />
          <Stack gap={2}>
            <Text className={styles.fileName}>{connection.name}</Text>
            <Text className={styles.namespace}>{connection.updatedBy}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td className={styles.tableCell}>
        <Text className={styles.cellText}>{connection.createdBy}</Text>
      </Table.Td>
      <Table.Td className={styles.tableCell}>
        <Text className={styles.cellText}>{connection.type}</Text>
      </Table.Td>
      <Table.Td className={styles.tableCell}>
        <Text className={styles.cellText}>
          {formatDate(new Date(connection.updatedAt))}
        </Text>
      </Table.Td>
    </Table.Tr>
  );
};
