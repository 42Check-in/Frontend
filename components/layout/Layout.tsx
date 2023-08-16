import type { ReactElement } from 'react';

import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <>
      <Header />
      <div className='h-full'>{children}</div>
    </>
  );
}
