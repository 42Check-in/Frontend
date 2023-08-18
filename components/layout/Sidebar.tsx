import Link from 'next/link';
import type { ReactElement } from 'react';

interface MenuProps {
  href: string;
  text: string;
}

function Menu({ href, text }: MenuProps): ReactElement {
  return (
    <Link
      href={href}
      className='rounded-[20px] bg-[#6A70FF] px-1 py-3.5 text-center text-sm font-bold text-white hover:bg-[#6AA6FF]'
    >
      {text}
    </Link>
  );
}

export default function Sidebar(): ReactElement {
  return (
    <div className='fixed left-0 z-10 bg-white pt-20'>
      <div className='flex h-screen w-28 flex-col space-y-2.5 border-r border-[#909090] px-2 py-3.5'>
        <Menu href='/conference-rooms' text='회의실 예약' />
        <Menu href='/visitors' text='외부인 방문' />
        <Menu href='/presentations' text='수요지식회' />
        <Menu href='/equipments' text='기자재 대여' />
      </div>
    </div>
  );
}