import { MantineProvider } from '@mantine/core';

export const MantineAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
  );
};
