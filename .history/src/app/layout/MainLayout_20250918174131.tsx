import { Header } from '../../widgets/header';
import { Sidebar } from '../../widgets/sidebar';
import { Footer } from '../../widgets/footer';
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
