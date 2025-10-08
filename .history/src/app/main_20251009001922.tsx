import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import AutomationsPage from '../pages/ui/automate/UI';
import './index.css';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      defaultColorScheme="dark" // или "light"
      theme={{
        fontFamily: 'Inter, sans-serif',
        primaryColor: 'blue',
        defaultRadius: 'md',
      }}
    >
      <AutomationsPage />
    </MantineProvider>
  </React.StrictMode>
);
