import React from 'react';
import { Group, Text, Badge } from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import styles from './styles.module.css';

export interface FilterPanelProps {
  onFilterChange: (filter: string) => void;
  onSeeAll: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterChange,
  onSeeAll,
}) => {
  return (
    <div className={styles.filterPanel}>
      <Group gap={10}>
        <Badge
          className={`${styles.filterTag} ${styles.active}`}
          onClick={() => onFilterChange('Recent')}
        >
          Recent
        </Badge>
        <Badge
          className={styles.filterTag}
          onClick={() => onFilterChange('Favorite')}
        >
          Favorite
        </Badge>
      </Group>

      <Group gap={4} className={styles.seeAllLink} onClick={onSeeAll}>
        <Text className={styles.seeAllText}>See all</Text>
        <BluePrintIcon name="arrow-right" size={16} color="#215DB0" />
      </Group>
    </div>
  );
};
