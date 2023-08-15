import Loading from '@/components/Loading';
import Layout from '@/components/layout/Layout';
import { type AppProps } from 'next/app';
import Head from 'next/head';
// import axios from 'axios';
import { Router } from 'next/router';
import React, { type ReactElement, useEffect, useState } from 'react';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  // const route = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = (): void => {
      setLoading(true);
    };
    const end = (): void => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  // useEffect(() => {
  //   const url = new URL(window.location.href);

  //   const postData = async () => {
  //     const code = url.searchParams.get('code');
  //     try {
  //       await axios
  //         .post('/api/auth/42login', null, {
  //           params: { code: code },
  //         })
  //         .then(() => setLoading(false))
  //         .then(() => route.push('/'));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (url.pathname === '/auth/callback') {
  //     void postData();
  //     setLoading(true);
  //   }
  // });

  return (
    <Layout>
      <Head>
        <title>42Check-in</title>
        <meta charSet='utf-8' />
        <meta name='description' content='모든 예약을 한 곳에' />
      </Head>
      {loading ? <Loading /> : <Component pageProps={pageProps} />}
    </Layout>
  );
}
