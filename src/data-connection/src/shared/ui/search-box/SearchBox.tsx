import { TextInput } from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import styles from './styles.module.css';

export interface SearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const SearchBox = ({
  value = '',
  onChange,
  placeholder = 'Search...',
  disabled = false,
  className,
  size = 'sm',
}: SearchBoxProps) => {
  return (
    <TextInput
      value={value}
      onChange={(event) => onChange?.(event.currentTarget.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      size={size}
      leftSection={<BluePrintIcon name="search" size={16} />}
      classNames={{
        input: styles.searchInput,
      }}
    />
  );
};
