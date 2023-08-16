import type { MouseEventHandler, ReactElement } from 'react';

interface BtnProps {
  fontSize: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  px: number;
  py: number;
  text: string;
}

export default function Btn({ fontSize, onClick, px, py, text }: BtnProps): ReactElement {
  return (
    <button
      className={`text-${fontSize} px-${px} py-${py} rounded-[20px] bg-[#6A70FF] font-bold text-white hover:bg-[#6AA6FF]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
