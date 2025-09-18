import { Link } from 'react-router-dom';
import { Group, Container } from '@mantine/core';
import { ThemeToggle } from '../../../features/theme/toggle';

export const Header = () => {
  return (
    <header>
      <Container>
        <Group justify="space-between" py="md">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </Group>
        <ThemeToggle />
      </Container>
    </header>
  );
};
