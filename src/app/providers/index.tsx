import { Provider } from 'effector-react';
import { scope } from './effector';
import { MantineAppProvider } from './mantine';
import { NotificationsProvider } from './notifications';
import { AppRouter } from './router';

export const AppProviders = () => {
  return (
    <Provider value={scope}>
      <MantineAppProvider>
        <NotificationsProvider />
        <AppRouter />
      </MantineAppProvider>
    </Provider>
  );
};
