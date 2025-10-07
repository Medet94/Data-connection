import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';

import AutomationsPage from '../pages/ui/automate/Automate';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <AutomationsPage />
    </MantineProvider>
  </React.StrictMode>
);
