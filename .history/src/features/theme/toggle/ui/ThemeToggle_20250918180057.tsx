import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@blueprintjs/icons';
import { BluePrintIcon } from '../../../../shared/index';

export const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon onClick={() => toggleColorScheme()} title="Toggle color scheme">
      {dark ? <IconSun /> : <IconMoon />}
    </ActionIcon>
  );
};
