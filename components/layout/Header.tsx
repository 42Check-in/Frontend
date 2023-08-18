import { darkModeIcon, noticeIcon, userIcon } from '@/assets/icons';
import { Logo } from '@/assets/images';
import { useRouter } from 'next/router';
import { type ReactElement, useState } from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps): ReactElement {
  const [noticeIsOpen, setNoticeIsOpen] = useState(true);
  const route = useRouter();
  return (
    <>
      <header className='fixed z-50 w-screen bg-blue-500'>
        <nav className='flex items-center justify-between px-10'>
          <button
            className='flex pb-3'
            onClick={() => {
              route.push('/');
            }}
          >
            {Logo}
          </button>
          <div className='flex items-center justify-center space-x-4'>
            <button>{darkModeIcon}</button>
            <button
              onClick={() => {
                setNoticeIsOpen(!noticeIsOpen);
              }}
            >
              {noticeIcon}
              {noticeIsOpen ? (
                <div className='absolute right-10 m-2 rounded-xl bg-[#e8e8e8] px-4 shadow-xl'>
                  <p className='mb-2 border-b-2 border-gray-400 pt-2 text-left font-semibold text-gray-500'>
                    NOTIFICATIONS
                  </p>
                  <div className='mb-4 space-y-2'>
                    {[1, 1, 1].map((item, i) => (
                      <div
                        key={i}
                        className='flex h-16 w-[280px] items-center justify-between rounded-lg bg-[#C8DCFC] px-2 shadow-md transition hover:bg-orange-200'
                      >
                        <span className=''>수요지식회 신청이 수락되었습니다.</span>
                        <span className=' align-top text-sm text-gray-500'>Today</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </button>
            <button>{userIcon}</button>
          </div>
        </nav>
      </header>
    </>
  );
}
