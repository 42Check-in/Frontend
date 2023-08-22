import Loading from '@/components/Loading';
import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const { data } = await apiController.get('/oauth/login', { params: { code } });
      console.log('data', data);
      await router.push('/');
    };
    void fetchData();
  }, []);

  return <Loading />;
}
