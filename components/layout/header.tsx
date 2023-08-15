/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Logo } from '@/assets/images';
import { userIcon, darkModeIcon, noticeIcon } from '@/assets/icons';
import { type ReactElement } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Header({ children }: LayoutProps): ReactElement {
  const logo = Logo;
  const route = useRouter();
  return (
    <>
      <header className='bg-blue-500'>
        <nav className='flex items-center justify-between px-10'>
          <button className='flex pb-3' onClick={() => route.push('/')}>
            {logo}
          </button>
          <div className='flex items-center justify-center space-x-4'>
            <button>{darkModeIcon}</button>
            <button>{noticeIcon}</button>
            <button>{userIcon}</button>
          </div>
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
}
