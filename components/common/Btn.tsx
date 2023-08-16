import type { MouseEventHandler, ReactElement } from 'react';

interface BtnProps {
  fontSize: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  px: string;
  py: string;
  text: string;
}

export default function Btn({ fontSize, onClick, px, py, text }: BtnProps): ReactElement {
  return (
    <button
      className={`rounded-[20px] bg-[#6A70FF] px-${px} py-${py} text-${fontSize} font-bold text-white hover:bg-[#6AA6FF]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
