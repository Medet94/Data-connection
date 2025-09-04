import { Stack, Loader, Text, Center } from '@mantine/core';
import styles from './styles.module.css';

export interface LoadingStateProps {
  message?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullHeight?: boolean;
  className?: string;
}

export const LoadingState = ({
  message = 'Loading...',
  size = 'md',
  fullHeight = false,
  className,
}: LoadingStateProps) => {
  const content = (
    <Stack align="center" gap={16} className={className}>
      <Loader size={size} />
      <Text c="dimmed" size="sm">
        {message}
      </Text>
    </Stack>
  );

  if (fullHeight) {
    return <Center className={styles.fullHeight}>{content}</Center>;
  }

  return <div className={styles.container}>{content}</div>;
};
