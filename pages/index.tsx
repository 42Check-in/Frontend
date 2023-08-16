import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div className='flex h-full items-center justify-center'>
      {/* 뒷배경 이미지들 */}
      <div className='relative -z-20 opacity-30'>
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
      {/* 안에 4가지 카테고리 (vh ) */}
      <div className='grid h-4/5 w-4/5 grid-cols-2 gap-8 lg:h-2/5 lg:grid-cols-4'>
        <div className=' relative flex w-full flex-col items-center justify-between rounded-3xl border bg-sky-300 bg-opacity-60'>
          <Link
            href={'/conferences'}
            className='flex h-full w-full flex-col items-center justify-between'
          >
            <h2 className='text-3xl font-extrabold text-gray-900'>회의실</h2>
            <Image
              src={'https://i.imgur.com/BgCoX27.png'}
              alt='conferences'
              width={100}
              height={100}
              unoptimized={true}
            />
          </Link>
        </div>
        <Link href={'/visitors'} className='rounded-3xl border'>
          <h2>외부인 방문</h2>
          <Image
            src={'https://i.imgur.com/bZ095Nd.png'}
            alt='visitors'
            width={100}
            height={100}
            unoptimized={true}
          />
        </Link>
        <Link href={'/presentations'} className='rounded-3xl border'>
          <h2>수요지식회</h2>
          <Image
            src={'https://i.imgur.com/AhuDuIv.png'}
            alt='presentations'
            width={100}
            height={100}
            unoptimized={true}
          />
        </Link>
        <Link href={'/equipments'} className='rounded-3xl border'>
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
