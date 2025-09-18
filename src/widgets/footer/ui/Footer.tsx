import { Container, Text } from '@mantine/core';

export const Footer = () => {
  return (
    <footer>
      <Container py="md">
        <Text size="sm" ta="center" c="dimmed">
          © {new Date().getFullYear()} My App. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
};
