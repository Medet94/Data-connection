import { NavLink } from 'react-router-dom';
import { Stack, Paper } from '@mantine/core';

export const Sidebar = () => {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <Stack>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </Stack>
    </Paper>
  );
};
