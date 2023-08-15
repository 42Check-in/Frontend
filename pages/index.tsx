import Image from 'next/image';
import { type ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <>
      {/* 메인 페이지 블러 처리를 위한 div */}
      <div className='bg-white w-screen opacity-60 -z-10 absolute'>
        {/* 뒷배경 이미지들 */}
        <div className='-z-20 relative'>
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
            width={300}
            height={300}
            unoptimized={true}
            className=' fixed left-1/2 top-[90px]'
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
      </div>
      <div className=''>안녕하세요.asdfasdfasdfasd</div>
    </>
  );
}
