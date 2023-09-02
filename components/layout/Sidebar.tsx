import ICONS from '@/assets/icons';
import { cls } from '@/styles/cls';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactElement, useEffect, useState } from 'react';

interface MenuProps {
  href: string;
  text: string;
}

function Menu({ href, text }: MenuProps): ReactElement {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={cls(
        router.pathname.startsWith(href) ? 'seletBtn' : 'notSeletBtn',
        'rounded-[20px] border-2 px-1 py-3.5 text-center text-sm font-bold text-white transition-colors duration-300 ease-in-out hover:border-[#6AA6FF] hover:bg-[#6AA6FF] dark:border-slate-800 dark:hover:bg-white',
      )}
    >
      {text}
    </Link>
  );
}

const MODETEXT = ['Light mode', 'Dark mode'];
export default function Sidebar({ showSidebar }): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const theme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  // function handleThemeToggleClick(): void {
  //   setIsDarkMode((prev) => {
  //     const curr = !prev;
  //     document.documentElement.classList.toggle('dark', curr);
  //     localStorage.setItem('theme', curr ? 'dark' : 'light');
  //     return curr;
  //   });
  // }

  // useEffect(() => {
  //   if (theme === null) {
  //     localStorage.setItem('theme', 'light');
  //   } else if (theme === 'dark') {
  //     document.documentElement.classList.toggle('dark', true);
  //   }
  // }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    const toggle = body.querySelector('.toggle');
    const modeSwitch = body.querySelector('.toggle-switch');
    const modeText = body.querySelector('.mode-text') as HTMLElement;

    modeSwitch.addEventListener('click', () => {
      body.classList.toggle('dark');

      if (body.classList.contains('dark')) {
        modeText.innerText = 'Light mode';
      } else {
        modeText.innerText = 'Dark mode';
      }
    });

    return () => {
      toggle.removeEventListener('click', () => {});
      modeSwitch.removeEventListener('click', () => {});
    };
  }, []);

  const toggleSidebar = () => {
    // sidebar의 상태를 변경하는 로직
    setIsOpen(!isOpen);
  };

  return (
    // <div
    //   className={cls(
    //     showSidebar ? 'sidebar' : '',
    //     'fixed left-0 z-40 bg-[#6282f7] pt-[62px] dark:bg-slate-800 ',
    //   )}
    // >
    //   <div className='flex h-screen w-28 flex-col space-y-2.5 border-r border-[#909090] px-2 py-3.5 dark:border-none'>
    //     <Menu href='/conference-rooms' text='회의실 예약' />
    //     <Menu href='/visitors' text='외부인 초대' />
    //     <Menu href='/presentations' text='수요지식회' />
    //     <Menu href='/equipments' text='기자재 대여' />
    //   </div>
    // </div>
    <nav className={cls(isOpen ? 'close' : '', 'sidebar border-r-2 ')}>
      <header>
        <div className='image-text'>
          <span className='image'></span>
          <div className='text logo-text ml-2'></div>
        </div>
        <i onClick={toggleSidebar} className='bx bx-chevron-right toggle'></i>
      </header>
      <div className='menu-bar'>
        <div className='menu'>
          <ul className='menu-links'>
            <li className='nav-link'>
              <Link href={'/'}>
                <i className='bx bx-home-alt icon'></i>
                <span className='text nav-text'>Dashboard</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className='bottom-content'>
          <li className=''>
            <a href='#'>
              <i className='bx bx-log-out icon'></i>
              <span className='text nav-text'>Logout</span>
            </a>
          </li>
          <li className='mode'>
            <div className='sun-moon mb-1'>
              <i className='bx bx-moon icon moon'></i>
              <i className='bx bx-sun icon sun'></i>
            </div>
            <span className='mode-text text'>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            <div className='toggle-switch'>
              <span className='switch'></span>
            </div>
          </li>
        </div>
      </div>
      <style>
        {`* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
      }

      :root {
        --sidebar-color: #fff;
        --primary-color: #6AA6FF;
        --primary-color-light: #ddd;
        --toggle-color: #6AA6FF;
        --text-color: #000;

        --tran-03: all 0.2s ease;
        --tran-03: all 0.3s ease;
        --tran-04: all 0.3s ease;
        --tran-05: all 0.3s ease;
      }

      body {
        min-height: 100vh;
        background-color: var(--body-color);
        transition: var(--tran-05);
      }

      ::selection {
        background-color: var(--primary-color);
        color: #fff;
      }

      body.dark {
        --body-color: #18191a;
        --sidebar-color: #242526;
        --primary-color: #3a3b3c;
        --primary-color-light: #3a3b3c;
        --toggle-color: #fff;
        --text-color: #ccc;
      }
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 250px;
        padding: 10px 14px;
        background: var(--sidebar-color);
        transition: var(--tran-05);
        z-index: 30;
      }
      .sidebar.close {
        width: 88px;
      }
      .sidebar li {
        height: 50px;
        list-style: none;
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
      .sidebar header .image,
      .sidebar .icon {
        min-width: 60px;
        min-height: 60px
      }
      .sidebar .icon {
        min-width: 60px;
        border-radius: 6px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      .sidebar .text,
      .sidebar .icon {
        color: var(--text-color);
        transition: var(--tran-03);
      }
      .sidebar .text {
        font-size: 17px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 1;
      }
      .sidebar.close .text {
        opacity: 0;
      }
      .sidebar header {
        position: relative;
      }
      .sidebar header .image-text {
        display: flex;
        align-items: center;
      }
      .sidebar header .logo-text {
        display: flex;
        flex-direction: column;
      }
      header .image-text .name {
        margin-top: 2px;
        font-size: 18px;
        font-weight: 600;
      }
      header .image-text .profession {
        font-size: 16px;
        margin-top: -2px;
        display: block;
      }
      .sidebar header .image img {
        width: 40px;
        border-radius: 6px;
      }
      .sidebar header .toggle {
        position: absolute;
        top: 160%;
        right: -25px;
        transform: translateY(-50%) rotate(180deg);
        height: 25px;
        width: 25px;
        background-color: var(--primary-color);
        color: var(--sidebar-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        cursor: pointer;
        transition: var(--tran-05);
      }
      body.dark .sidebar header .toggle {
        color: var(--text-color);
      }
      .sidebar.close .toggle {
        transform: translateY(-50%) rotate(0deg);
      }
      .sidebar .menu {
        margin-top: 40px;
      }
      .sidebar li.search-box {
        border-radius: 6px;
        background-color: var(--primary-color-light);
        cursor: pointer;
        transition: var(--tran-05);
      }
      .sidebar li.search-box input {
        height: 100%;
        width: 100%;
        outline: none;
        border: none;
        background-color: var(--primary-color-light);
        color: var(--text-color);
        border-radius: 6px;
        font-size: 17px;
        font-weight: 500;
        transition: var(--tran-05);
      }
      .sidebar li a {
        list-style: none;
        height: 100%;
        background-color: transparent;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        border-radius: 6px;
        text-decoration: none;
        transition: var(--tran-03);
      }
      .sidebar li a:hover {
        background-color: var(--primary-color);
      }
      .sidebar li a:hover .icon,
      .sidebar li a:hover .text {
        color: var(--sidebar-color);
      }
      body.dark .sidebar li a:hover .icon,
      body.dark .sidebar li a:hover .text {
        color: var(--text-color);
      }
      .sidebar .menu-bar {
        height: calc(100% - 55px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
      }
      .menu-bar::-webkit-scrollbar {
        display: none;
      }
      .sidebar .menu-bar .mode {
        border-radius: 6px;
        background-color: var(--primary-color-light);
        position: relative;
        transition: var(--tran-05);
      }
      .menu-bar .mode .sun-moon {
        height: 50px;
        width: 60px;
      }
      .mode .sun-moon i {
        position: absolute;
      }
      .mode .sun-moon i.sun {
        opacity: 0;
      }
      body.dark .mode .sun-moon i.sun {
        opacity: 1;
      }
      body.dark .mode .sun-moon i.moon {
        opacity: 0;
      }
      .menu-bar .bottom-content .toggle-switch {
        position: absolute;
        right: 0;
        height: 100%;
        min-width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        cursor: pointer;
      }
      .toggle-switch .switch {
        position: relative;
        height: 22px;
        width: 40px;
        border-radius: 25px;
        background-color: var(--toggle-color);
        transition: var(--tran-05);
      }
      .switch::before {
        content: "";
        position: absolute;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        background-color: var(--sidebar-color);
        transition: var(--tran-04);
      }
      body.dark .switch::before {
        left: 20px;
      }
      .home {
        position: absolute;
        top: 0;
        top: 0;
        left: 250px;
        height: 100vh;
        width: calc(100% - 250px);
        background-color: var(--body-color);
        transition: var(--tran-05);
      }
      .home .text {
        font-size: 30px;
        font-weight: 500;
        color: var(--text-color);
        padding: 12px 60px;
      }
      .sidebar.close ~ .home {
        left: 78px;
        height: 100vh;
        width: calc(100% - 78px);
      }
      body.dark .home .text {
        color: var(--text-color);
      }`}
      </style>
    </nav>
  );
}
