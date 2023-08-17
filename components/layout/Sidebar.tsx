import type { ReactElement } from 'react';

import Btn from '../common/Btn';

interface MenuProps {
  text: string;
}

function Menu({ text }: MenuProps): ReactElement {
  return <Btn fontSize='sm' onClick={() => {}} px='1' py='4' text={text} />;
}

export default function Sidebar(): ReactElement {
  return (
    <div className='fixed left-0 pt-20'>
      <div className='flex h-screen w-28 flex-col space-y-2.5 border-r border-[#909090] px-2 py-3.5'>
        <Menu text='회의실 예약' />
        <Menu text='외부인 방문' />
        <Menu text='수요지식회' />
        <Menu text='기자재 대여' />
      </div>
    </div>
  );
}
