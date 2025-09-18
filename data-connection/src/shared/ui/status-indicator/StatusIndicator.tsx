import { Badge, Group, Text } from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import styles from './styles.module.css';

export type StatusType =
  | 'active'
  | 'inactive'
  | 'error'
  | 'warning'
  | 'pending'
  | 'success';

export interface StatusIndicatorProps {
  status: StatusType;
  text?: string;
  showIcon?: boolean;
  variant?: 'badge' | 'dot' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const statusConfig = {
  active: {
    color: 'green',
    icon: 'tick-circle' as const,
    text: 'Active',
  },
  inactive: {
    color: 'gray',
    icon: 'disable' as const,
    text: 'Inactive',
  },
  error: {
    color: 'red',
    icon: 'error' as const,
    text: 'Error',
  },
  warning: {
    color: 'yellow',
    icon: 'warning-sign' as const,
    text: 'Warning',
  },
  pending: {
    color: 'blue',
    icon: 'time' as const,
    text: 'Pending',
  },
  success: {
    color: 'green',
    icon: 'tick' as const,
    text: 'Success',
  },
};

export const StatusIndicator = ({
  status,
  text,
  showIcon = true,
  variant = 'badge',
  size = 'sm',
}: StatusIndicatorProps) => {
  const config = statusConfig[status];
  const displayText = text || config.text;

  if (variant === 'dot') {
    return (
      <Group gap={8} className={styles.dotIndicator}>
        <div className={`${styles.dot} ${styles[`dot-${config.color}`]}`} />
        <Text size={size} c={config.color}>
          {displayText}
        </Text>
      </Group>
    );
  }

  if (variant === 'text') {
    return (
      <Group gap={4}>
        {showIcon && <BluePrintIcon name={config.icon} size={14} />}
        <Text size={size} c={config.color}>
          {displayText}
        </Text>
      </Group>
    );
  }

  return (
    <Badge
      color={config.color}
      variant="light"
      size={size}
      leftSection={
        showIcon ? <BluePrintIcon name={config.icon} size={12} /> : undefined
      }
    >
      {displayText}
    </Badge>
  );
};
