'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import { ReduxProvider } from '../lib/providers/ReduxProvider';
import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: 'Inter, system-ui, sans-serif',
  primaryColor: 'blue',
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
    </ReduxProvider>
  );
} 