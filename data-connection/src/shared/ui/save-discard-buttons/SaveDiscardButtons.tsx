import { Button, Group } from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import styles from './styles.module.css';

export interface SaveDiscardButtonsProps {
  onSave?: () => void;
  onDiscard?: () => void;
  saveText?: string;
  discardText?: string;
  saveDisabled?: boolean;
  saveLoading?: boolean;
  showDiscard?: boolean;
  showSave?: boolean;
}

export const SaveDiscardButtons = ({
  onSave,
  onDiscard,
  saveText = 'Save',
  discardText = 'Discard',
  saveDisabled = false,
  saveLoading = false,
  showDiscard = true,
  showSave = true,
}: SaveDiscardButtonsProps) => {
  return (
    <Group justify="flex-end" gap={12} className={styles.saveDiscardButtons}>
      {showDiscard && (
        <Button
          variant="outline"
          onClick={onDiscard}
          disabled={saveLoading}
          leftSection={<BluePrintIcon name="cross" size={16} />}
        >
          {discardText}
        </Button>
      )}

      {showSave && (
        <Button
          onClick={onSave}
          disabled={saveDisabled || saveLoading}
          loading={saveLoading}
          leftSection={<BluePrintIcon name="floppy-disk" size={16} />}
        >
          {saveText}
        </Button>
      )}
    </Group>
  );
};
