import { Logo } from '@/assets/images';
import { type ReactElement } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function header({ children }: LayoutProps): ReactElement {
  const logo = Logo;
  return (
    <>
      <div className='bg-blue-600 flex justify-between'>
        <div>{logo}</div>
        <div>b</div>
      </div>
      <div>{children}</div>
    </>
  );
}
