import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import type { AppProps } from 'next/app';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

// next-auth
import Providers from '@/components/Provider';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position='top-center' limit={3} />
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </MantineProvider>
  );
}
