/* eslint-disable @typescript-eslint/promise-function-async */

/* eslint-disable @typescript-eslint/no-misused-promises */
import { darkModeIcon, noticeIcon, userIcon } from '@/assets/icons';
import { Logo } from '@/assets/images';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps): ReactElement {
  const logo = Logo;
  const route = useRouter();
  return (
    <>
      <header className='bg-blue-500 fixed '>
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
