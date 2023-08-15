import Header from '@/components/layout/Header';
import Image from 'next/image';
import { type ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div>
      <Header>
        <div className='bg-slate-700 w-screen h-screen opacity-20 z-10 absolute' />
        <div className='z-0 relative'>
          <Image
            src={'https://i.imgur.com/2fOlNnG.png'}
            alt='conferenceImg'
            width={900}
            height={900}
            unoptimized={true}
            className=' fixed -bottom-[13%] -left-[200px]'
          />
          <Image
            src={'https://i.imgur.com/DkpUR4N.png'}
            alt='checkLintImg'
            width={400}
            height={400}
            unoptimized={true}
            className=' fixed left-1/2'
          />
          <Image
            src={'https://i.imgur.com/0zfzFX5.png'}
            alt='sttingManImg'
            width={900}
            height={900}
            unoptimized={true}
            className=' fixed -right-40 bottom-0'
          />
        </div>
      </Header>
    </div>
  );
}
