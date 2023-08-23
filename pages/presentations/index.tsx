import { calenderIcon } from '@/assets/icons';
import apiController from '@/utils/apiController';
import axios from 'axios';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { type ReactElement, useState } from 'react';

interface Data {
  formId: number;
  status: number;
  date: string;
  subject: string; // 발표 제목
  contents: string; // 발표 내용
  detail: string; // 상세 내용
  time: number; // (enum) 15, 30, 45, 1시간
  type: number; // 유형 겁나 많음 enum
  screen: boolean;
}

// interface PageProps {
//   presentationsInfo: Data[];
// }

export default function Presentations({
  data,
}: InferGetServerSidePropsType<GetServerSideProps>): ReactElement {
  const { presentationsInfo } = data;
  return (
    <div className='m-8 rounded-2xl border-2 border-[#6A70FF] bg-slate-100 p-8 shadow-xl'>
      <div className='flex items-center justify-between border-b-2'>
        <h1 className='text-xl font-semibold text-gray-600'>2023</h1>
        <div>
          <h3 className='text-xl font-semibold text-gray-600'>8 월</h3>
        </div>
        <button>{calenderIcon}</button>
      </div>
      <div className='mt-2 space-y-2'>
        {presentationsInfo.map((item: Data, i: number) => (
          <Link
            key={i}
            href={`/presentations/${item.date}`}
            className='group flex items-center justify-between rounded-md bg-white shadow-xl transition hover:bg-[#6AA6FF]'
          >
            <div className='flex items-center justify-center space-x-2 '>
              <button className='h-16 w-16 rounded-md text-2xl font-semibold text-gray-600 transition group-hover:text-white'>
                {item.date}
              </button>
              <div>
                <h1 className='font-semibold text-gray-800'>제목 : {item.subject}</h1>
                <h5 className=' text-gray-500'>{item.detail}🤩</h5>
              </div>
            </div>
            <button className='mr-4 rounded-xl px-3 group-hover:bg-white'>신청</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const config = {
    url: `/presentations`,
    method: 'GET',
    data: {
      params: { month: new Date().getMonth() },
    },
  };
  const { data } = await apiController(config);
  return {
    props: {
      data,
    },
  };
};
