import Loading from '@/components/Loading';
import apiController from '@/utils/apiController';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

interface JwtPayload {
  exp: number;
  iat: number;
  intraId: string;
  sub: string;
}

export default function Login(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const config = {
        url: '/oauth/login',
        params: { code },
      };
      const { data } = await apiController(config);
      localStorage.setItem('token', data);
      await router.push('/');
    };
    void fetchData();
  }, []);

  return <Loading />;
}
