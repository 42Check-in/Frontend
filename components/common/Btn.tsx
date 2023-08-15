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
      className={`text-${fontSize} px-${px} py-${py} bg-[#6A70FF] hover:bg-[#6AA6FF] text-white font-bold rounded-[20px]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
