import { darkModeIcon, noticeIcon, userIcon } from '@/assets/icons';
import { Logo } from '@/assets/images';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps): ReactElement {
  const router = useRouter();

  const noticeRef = useRef<HTMLDivElement>(null);
  const [showNotice, setShowNotice] = useState(0);

  useEffect(() => {
    setShowNotice(0);
  }, [router.asPath]);

  useEffect(() => {
    function handleOutsideClick(event: any): void {
      if (showNotice > 0 && noticeRef.current?.contains(event.target as Node) === false) {
        setShowNotice(0);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showNotice]);

  return (
    <>
      <header className='fixed z-50 w-screen bg-[#4069FD]'>
        <nav className='flex items-center justify-between px-10'>
          <button
            className='flex pb-3'
            onClick={() => {
              router.push('/');
            }}
          >
            {Logo}
          </button>
          <div className='flex items-center justify-center space-x-4'>
            <button>{darkModeIcon}</button>
            <button
              onClick={() => {
                showNotice === 2 ? setShowNotice(1) : setShowNotice(showNotice ^ 1);
              }}
            >
              {noticeIcon}
              {showNotice === 1 && (
                <div
                  ref={noticeRef}
                  className='absolute right-10 top-16 m-2 rounded-xl bg-[#e8e8e8] px-4 shadow-xl'
                >
                  <p className='mb-2 border-b-2 border-gray-400 pt-2 text-left font-semibold text-gray-500'>
                    NOTIFICATIONS
                  </p>
                  <div className='mb-4 space-y-2'>
                    {[1, 1, 1].map((item, i) => (
                      <div
                        key={i}
                        className='group flex h-16 w-[280px] items-center justify-between rounded-lg bg-[#C8DCFC] px-2 shadow-md transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                      >
                        <span className=' text-base font-semibold text-gray-700 group-hover:text-white'>
                          수요지식회 신청이 수락되었습니다.
                        </span>
                        <span className=' align-top text-sm text-gray-500  group-hover:text-white'>
                          Today
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </button>
            <button
              onClick={() => {
                showNotice === 1 ? setShowNotice(2) : setShowNotice(showNotice ^ 2);
              }}
            >
              {userIcon}
              {showNotice === 2 && (
                <div
                  ref={noticeRef}
                  className='absolute right-6 top-16 m-2 flex flex-col rounded-xl bg-[#e8e8e8] px-4 shadow-xl'
                >
                  <Link
                    href={'/my-check-in'}
                    className='mt-2 rounded-lg p-4 font-semibold text-gray-600 transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                  >
                    My Check - in
                  </Link>
                  <Link
                    href={'/login'}
                    className='mb-2 rounded-lg p-4 font-semibold text-gray-600 transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
