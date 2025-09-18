import { ScopeProvider } from 'effector-react/scope';
import { scope } from './effector';
import { MantineAppProvider } from './mantine';
import { NotificationsProvider } from './notifications';
import { AppRouter } from './router';

export const AppProviders = () => {
  return (
    <ScopeProvider value={scope}>
      <MantineAppProvider>
        <NotificationsProvider />
        <AppRouter />
      </MantineAppProvider>
    </ScopeProvider>
  );
};
