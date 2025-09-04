import React from 'react';
import { Table, Text } from '@mantine/core';
import { DataConnection } from '#/shared/types';
import { ConnectionRow } from './connection-row';
import styles from './styles.module.css';

export interface RecentConnectionsProps {
  connections: DataConnection[];
  onViewAll: () => void;
}

export const RecentConnections: React.FC<RecentConnectionsProps> = ({
  connections,
  onViewAll,
}) => {
  return (
    <div className={styles.tableContainer}>
      <Table>
        <Table.Thead>
          <Table.Tr className={styles.headerRow}>
            <Table.Th className={styles.headerCell}>
              <Text className={styles.headerText}>Files</Text>
            </Table.Th>
            <Table.Th className={styles.headerCell}>
              <Text className={styles.headerText}>Creator</Text>
            </Table.Th>
            <Table.Th className={styles.headerCell}>
              <Text className={styles.headerText}>Last Edited By</Text>
            </Table.Th>
            <Table.Th className={styles.headerCell}>
              <Text className={styles.headerText}>Last Viewed</Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {connections.map((connection) => (
            <ConnectionRow key={connection.id} connection={connection} />
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

const requestBody = {
  name: 'MSSQL 15',
  description: 'string',
  type: 'string',
  projectId: 'string',
  folderId: 'string',
  rid: 'string',
  createdBy: 'string',
  config: {
    additionalProp1: 'string',
    additionalProp2: 'string',
    additionalProp3: 'string',
  },
};
