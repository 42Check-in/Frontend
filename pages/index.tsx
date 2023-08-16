import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div className='h-full flex justify-center items-center'>
      {/* 메인 페이지 블러 처리를 위한 div */}
      <div className='bg-white w-screen opacity-30 -z-10 absolute'>
        {/* 뒷배경 이미지들 */}
        <div className='-z-20 relative'>
          <Image
            src={'https://i.imgur.com/2fOlNnG.png'}
            alt='calendarImg'
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
      {/* 안에 4가지 카테고리 (vh ) */}
      <div className='space-x-10 place-content-center place-items-center mx-4 grid grid-flow-row lg:grid-cols-4 grid-cols-2 '>
        <div className='border rounded-3xl flex flex-col justify-center items-center'>
          <Link href={'/conferences'}>
            <h2>회의실</h2>
            <Image
              src={'https://i.imgur.com/BgCoX27.png'}
              alt='conferences'
              width={100}
              height={100}
              unoptimized={true}
            />
          </Link>
        </div>
        <Link href={'/visitors'} className='border rounded-3xl'>
          <h2>외부인 방문</h2>
          <Image
            src={'https://i.imgur.com/bZ095Nd.png'}
            alt='visitors'
            width={100}
            height={100}
            unoptimized={true}
          />
        </Link>
        <Link href={'/presentations'} className='border rounded-3xl'>
          <h2>수요지식회</h2>
          <Image
            src={'https://i.imgur.com/AhuDuIv.png'}
            alt='presentations'
            width={100}
            height={100}
            unoptimized={true}
          />
        </Link>
        <Link href={'/equipments'} className='border rounded-3xl'>
          <h2>기자재 대여</h2>
          <Image
            src={'https://i.imgur.com/qRynJ5O.png'}
            alt='equipments'
            width={100}
            height={100}
            unoptimized={true}
          />
        </Link>
      </div>
    </div>
  );
}
