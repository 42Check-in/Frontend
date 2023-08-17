import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

interface CalendarDayProps {
  children: ReactNode;
}

interface CalendarRowProps {
  firstDay: number;
  lastDay: number;
  row: number;
  currentMonth: number;
  currentYear: number;
}

function CalendarDay({ children }: CalendarDayProps): ReactElement {
  return (
    <td className='relative px-2 py-3 text-center text-gray-800 hover:text-blue-500 dark:text-gray-100 md:px-3'>
      {children}
    </td>
  );
}

export default function CalendarRow({
  firstDay,
  lastDay,
  row,
  currentMonth,
  currentYear,
}: CalendarRowProps): ReactElement {
  const today = useState(new Date().getDate())[0];

  const contents = [];
  if (row === 0) {
    for (let i = 0; i < firstDay; ++i) {
      contents.push(<td></td>);
    }
    contents.push(<CalendarDay>1</CalendarDay>);
    const len = 7 - contents.length;
    for (let i = 1; i <= len; ++i) {
      contents.push(
        <>
          {today === i + 1 &&
          new Date().getMonth() === currentMonth &&
          new Date().getFullYear() === currentYear ? (
            <CalendarDay>
              <span className='rounded-full border-2 border-green-400 p-1'>{i + 1}</span>
            </CalendarDay>
          ) : (
            <CalendarDay>{i + 1}</CalendarDay>
          )}
        </>,
      );
    }
    return <>{contents}</>;
  }
  for (let i = 1; i <= 7; ++i) {
    if (i + (7 * row - firstDay) <= lastDay) {
      contents.push(
        <>
          {today === i + (7 * row - firstDay) &&
          new Date().getMonth() === currentMonth &&
          new Date().getFullYear() === currentYear ? (
            <CalendarDay>
              <span className='rounded-full border-2 border-green-400 p-1'>
                {i + (7 * row - firstDay)}
              </span>
            </CalendarDay>
          ) : (
            <CalendarDay>{i + (7 * row - firstDay)}</CalendarDay>
          )}
        </>,
      );
    }
  }
  return <>{contents}</>;
}
