import { useState } from 'react';
import {
  Card,
  Table,
  Group,
  Button,
  Text,
  Pagination,
  Stack,
  ScrollArea,
  Badge,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import styles from './styles.module.css';

interface DataPreviewProps {
  data: any[];
  pageSize?: number;
}

export const DataPreview = ({ data, pageSize = 10 }: DataPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || data.length === 0) {
    return (
      <Card withBorder>
        <Text c="dimmed" ta="center" py={40}>
          No data to preview
        </Text>
      </Card>
    );
  }

  const columns = Object.keys(data[0]);

  // Paginate data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <Card withBorder>
      <Stack gap={16}>
        {/* Header */}
        <Group justify="space-between" align="center">
          <div>
            <Group gap={8}>
              <BluePrintIcon name="th" size={16} />
              <Text fw={500}>Data Preview</Text>
              <Badge variant="light" size="sm">
                {data.length.toLocaleString()} rows
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Sample data from the selected resource
            </Text>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftSection={<BluePrintIcon name="download" size={14} />}
          >
            Export Sample
          </Button>
        </Group>

        {/* Data Table */}
        <ScrollArea className={styles.tableContainer}>
          <Table striped highlightOnHover className={styles.dataTable}>
            <Table.Thead>
              <Table.Tr>
                {columns.map((column) => (
                  <Table.Th key={column} className={styles.columnHeader}>
                    <Group gap={4} wrap="nowrap">
                      <Text size="sm" fw={500}>
                        {column}
                      </Text>
                      <BluePrintIcon name="caret-down" size={10} />
                    </Group>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedData.map((row, index) => (
                <Table.Tr key={index}>
                  {columns.map((column) => (
                    <Table.Td key={column} className={styles.cell}>
                      <Text size="sm" className={styles.cellText}>
                        {row[column]?.toString() || '—'}
                      </Text>
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of{' '}
              {data.length} rows
            </Text>

            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              size="sm"
            />
          </Group>
        )}
      </Stack>
    </Card>
  );
};
