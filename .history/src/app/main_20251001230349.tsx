import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from './app/providers/ThemeProvider';
import AutomationsPage from './pages/AutomationsPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <ThemeProvider>
        <AutomationsPage />
      </ThemeProvider>
    </MantineProvider>
  </React.StrictMode>
);
