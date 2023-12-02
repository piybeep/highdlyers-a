import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import type {AppProps} from 'next/app';
import {createTheme, MantineProvider} from '@mantine/core';
import {Notifications} from '@mantine/notifications';

// next-auth
import Providers from '@/components/Provider';
import {NextComponentType} from 'next';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const getLayout = (Component as NextComponentType & { getLayout: any }).getLayout || ((page: any) => page)

  return (
    <MantineProvider theme={theme}>
      <Notifications position='bottom-center' limit={3} />
      <Providers>
        {getLayout(< Component {...pageProps} />)}
      </Providers>
    </MantineProvider>
  );
}