import { Button, Group } from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import styles from './styles.module.css';

export interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
  continueText?: string;
  finishText?: string;
  backText?: string;
  cancelText?: string;
  continueDisabled?: boolean;
  finishDisabled?: boolean;
  backDisabled?: boolean;
  showBack?: boolean;
  showContinue?: boolean;
  showFinish?: boolean;
  showCancel?: boolean;
  loading?: boolean;
}

export const NavigationButtons = ({
  onBack,
  onContinue,
  onFinish,
  onCancel,
  continueText = 'Continue',
  finishText = 'Finish',
  backText = 'Back',
  cancelText = 'Cancel',
  continueDisabled = false,
  finishDisabled = false,
  backDisabled = false,
  showBack = true,
  showContinue = true,
  showFinish = false,
  showCancel = false,
  loading = false,
}: NavigationButtonsProps) => {
  return (
    <Group justify="space-between" className={styles.navigationButtons}>
      <Group gap={12}>
        {showCancel && (
          <Button
            variant="subtle"
            onClick={onCancel}
            disabled={loading}
            leftSection={<BluePrintIcon name="cross" size={16} />}
          >
            {cancelText}
          </Button>
        )}
      </Group>

      <Group gap={12}>
        {showBack && (
          <Button
            variant="outline"
            onClick={onBack}
            disabled={backDisabled || loading}
            leftSection={<BluePrintIcon name="arrow-left" size={16} />}
          >
            {backText}
          </Button>
        )}

        {showContinue && (
          <Button
            onClick={onContinue}
            disabled={continueDisabled || loading}
            rightSection={<BluePrintIcon name="arrow-right" size={16} />}
            loading={loading}
          >
            {continueText}
          </Button>
        )}

        {showFinish && (
          <Button
            onClick={onFinish}
            disabled={finishDisabled || loading}
            rightSection={<BluePrintIcon name="tick" size={16} />}
            loading={loading}
          >
            {finishText}
          </Button>
        )}
      </Group>
    </Group>
  );
};
