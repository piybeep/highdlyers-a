// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import type { AppProps } from 'next/app';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
// import { useUser } from '@/store/user';
// import { useEffect } from 'react';
// import api from '@/lib/api';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  // const { isAuth, user } = useUser()
  // console.log(isAuth)
  // console.log(user)
  // useEffect(() => {
  //   api.get('/auth/refresh', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
  //     }
  //   })
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }, [])
  return (
    <MantineProvider theme={theme}>
      <Notifications position='top-center' limit={3} />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
