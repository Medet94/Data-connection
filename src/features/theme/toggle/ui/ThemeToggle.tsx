import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { BluePrintIcon } from '../../../../shared/index';

export const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon onClick={() => toggleColorScheme()} title="Toggle color scheme">
      {dark ? <BluePrintIcon name="flash" /> : <BluePrintIcon name="moon" />}
    </ActionIcon>
  );
};
