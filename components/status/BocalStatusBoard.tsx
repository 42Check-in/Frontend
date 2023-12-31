import type { ApplicationFormInfo } from '@/interfaces/FormInfo';
import PresentationsFormInfo from '@/interfaces/PresentationsFormInfo';
import { cls } from '@/styles/cls';
import apiController from '@/utils/apiController';
import exportData from '@/utils/exportData';
import type { AxiosRequestConfig } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { Dispatch, ReactElement } from 'react';

import PresentationsStatus from './PresentationsStatus';
import Status from './Status';
import { btnContent } from './StatusBoard';

interface BocalStatusBoardProps {
  setCheckedList: Dispatch<React.SetStateAction<ApplicationFormInfo[]>>;
  checkedList: ApplicationFormInfo[];
  setChangePresentations: Dispatch<React.SetStateAction<{}>>;
  changePresentations: {};
}

interface FormInfosPage {
  list: ApplicationFormInfo[];
  pageCount: number;
}

const getPageOffset = (pageNumber): number => {
  if (pageNumber === 0) return 0;
  return Math.floor((pageNumber - 1) / 5);
};

export default function BocalStatusBoard({
  setCheckedList,
  checkedList,
  setChangePresentations,
  changePresentations,
}: BocalStatusBoardProps): ReactElement {
  const router = useRouter();
  const { category, filter, page, size } = router.query;
  const currentPage = Number(page);
  const initialOffset = getPageOffset(currentPage);

  // const filterRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(false);
  const [formInfos, setFormInfos] = useState<ApplicationFormInfo[]>();
  const [pageCount, setPageCount] = useState<number>();
  const [pageNumbers, setPageNumbers] = useState<number[]>();
  const [pageOffset, setPageOffset] = useState<number>(initialOffset);
  const [selectedFormInfo, setSelectedFormInfo] = useState<ApplicationFormInfo>();
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (pageCount === undefined) return;
    if (pageCount === 0) {
      setPageNumbers([1]);
      return;
    }
    if (currentPage > pageCount) return;
    setPageNumbers(
      [...Array(5)]
        .map((_, index) => 5 * pageOffset + index + 1)
        .filter((value) => value <= pageCount),
    );
  }, [pageCount, pageOffset]);

  useEffect(() => {
    async function getFormInfosPage(): Promise<void> {
      const config: AxiosRequestConfig = {
        url: `/bocal/subscriptions/${category as string}/form/${filter as string}`,
        params: { page, size },
      };
      if (category !== 'presentations') {
        config.params.sort = 'id,desc';
      }
      const { data } = await apiController<FormInfosPage>(config);
      const { list, pageCount } = data;
      setFormInfos(list);
      setPageCount(pageCount);
    }
    setShowDropDown(false);
    void getFormInfosPage();
  }, [router]);

  useEffect(() => {
    if (selectedFormInfo === undefined) return;
    const query = { ...router.query };
    if (selectedFormInfo === null) {
      delete query.formInfo;
    } else {
      query.formInfo = JSON.stringify(selectedFormInfo);
    }
    void router.push({ query });
  }, [selectedFormInfo]);

  // useEffect(() => {
  //   function handleOutsideClick(event: any): void {
  //     if (!showDropDown) return;
  //     if (!filterRef.current.contains(event.target as Node)) {
  //       setShowDropDown(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [showDropDown]);

  if (formInfos === undefined) return;
  if (pageNumbers === undefined) return;

  const lastPageOffset = getPageOffset(pageCount);
  const sliceIndex = category === 'presentations' ? 0 : 1;
  const filters = [
    {
      name: 'all',
      title: '전체',
    },
    {
      name: 'not-approval',
      title: category === 'presentations' ? '진행 중' : '미승인',
    },
    {
      name: 'approval',
      title: category === 'presentations' ? '강의 완료' : '승인',
    },
  ];

  const paginate = (pageNumber: number): void => {
    void router.push({
      query: {
        ...router.query,
        page: pageNumber,
      },
    });
  };

  const btnBox = btnContent
    .filter((value) => value.category !== 'conference-rooms')
    .map((item) => {
      const handleCategoryClick = (): void => {
        setFormInfos([]);
        setChecked(false);
        const query = { ...router.query };
        query.category = item.category;
        delete query.formInfo;
        if (item.category === 'presentations') {
          delete query.sort;
        } else {
          query.sort = 'id,desc';
          if (filter === 'all') {
            query.filter = 'not-approval';
          }
        }
        void router.push({ query });
      };
      return (
        <div key={item.text} onClick={handleCategoryClick}>
          <button
            className={cls(
              category === item.category ? 'seletBtn' : 'notSeletBtn',
              'rounded-[20px] p-2 text-sm text-white hover:border-[#6AA6FF] hover:bg-[#6AA6FF] dark:hover:border-slate-700 dark:hover:bg-white',
            )}
          >
            {item.text}
          </button>
        </div>
      );
    });
  return (
    <div className='m-4 flex h-full max-h-[79vh] min-w-[360px] flex-col justify-between overflow-auto rounded-xl border bg-white dark:bg-slate-800'>
      <div className='top-0 flex items-center justify-between space-x-4 border-b-2 bg-white p-4 dark:bg-slate-700'>
        <div className='flex w-full items-center space-x-2'>
          {
            <input
              value='white'
              type='checkbox'
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                if (checked) setCheckedList([]);
                else setCheckedList(formInfos.map((item) => item));
              }}
              className={cls(
                router.query.filter === 'approval' && 'invisible',
                'mr-3 h-5 w-5 rounded border-gray-300 transition hover:ring-2 hover:ring-indigo-500 focus:ring-indigo-500',
              )}
            />
          }
          <div className='flex space-x-2'>{btnBox}</div>
        </div>
        <div className='relative inline-block text-left'>
          <div>
            <button
              type='button'
              className='inline-flex w-full justify-center gap-x-1.5 whitespace-nowrap rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              id='menu-button'
              aria-expanded='true'
              aria-haspopup='true'
              onClick={() => {
                setShowDropDown(!showDropDown);
              }}
            >
              {filters.find(({ name }) => name === filter).title}
              <svg
                className='-mr-1 h-5 w-5 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          {showDropDown && (
            <div
              className='absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='menu-button'
            >
              <div className='w-max py-1 text-center' role='none'>
                {filters.slice(sliceIndex).map(({ name, title }) => (
                  <Link
                    key={name}
                    href={{
                      query: {
                        ...router.query,
                        filter: name,
                        page: 1,
                      },
                    }}
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='mt-6 w-full flex-1'>
        {formInfos.map((item, i) => (
          <div
            key={item.formId}
            className='group mx-2 mb-4 flex h-14 items-center justify-center rounded-2xl border-2 shadow-xl transition duration-300 hover:bg-[#6AA6FF] dark:hover:bg-gray-700'
            onClick={() => {
              if (item.formId === selectedFormInfo?.formId) {
                setSelectedFormInfo(null);
                return;
              }
              setSelectedFormInfo(item);
            }}
          >
            <input
              value='white'
              type='checkbox'
              onClick={(e) => {
                e.stopPropagation();
              }}
              checked={item.status > 0 ? false : checkedList.includes(item)}
              onChange={() => {
                checkedList.includes(item)
                  ? setCheckedList(checkedList.filter((id) => id !== item))
                  : setCheckedList([...checkedList, item]);
              }}
              className={cls(
                (item.status > 0 && category !== 'presentations') ||
                  (item.status > 2 && category === 'presentations')
                  ? 'invisible'
                  : '',
                'mx-2 h-4 w-4 rounded border-gray-300 transition',
              )}
            />
            {category !== 'presentations' ? (
              <Status status={item} bocal />
            ) : (
              <>
                <PresentationsStatus
                  status={item as PresentationsFormInfo}
                  changePresentations={changePresentations}
                  setChangePresentations={setChangePresentations}
                />
              </>
            )}
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => {
            setPageOffset(0);
          }}
          className={cls(pageOffset === 0 && 'opacity-30', 'm-1 h-8 w-8 hover:text-blue-500')}
          disabled={pageOffset === 0}
        >
          {'<<'}
        </button>
        <button
          onClick={() => {
            setPageOffset(pageOffset - 1);
          }}
          className={cls(pageOffset === 0 && 'opacity-30', 'm-1 h-8 w-8 hover:text-blue-500')}
          disabled={pageOffset === 0}
        >
          {'<'}
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => {
              paginate(number);
            }}
            className={`m-1 h-8 w-8 ${
              number === currentPage ? 'rounded-full bg-blue-500 text-white' : 'hover:text-blue-500'
            }`}
            disabled={number === currentPage}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => {
            setPageOffset(pageOffset + 1);
          }}
          className={cls(
            pageOffset === lastPageOffset && 'opacity-30',
            'm-1 h-8 w-8 hover:text-blue-500',
          )}
          disabled={pageOffset === lastPageOffset}
        >
          {'>'}
        </button>
        <button
          onClick={() => {
            setPageOffset(getPageOffset(pageCount));
          }}
          className={cls(
            pageOffset === lastPageOffset && 'opacity-30',
            'm-1 h-8 w-8 hover:text-blue-500',
          )}
          disabled={pageOffset === lastPageOffset}
        >
          {'>>'}
        </button>
      </div>
      <button
        onClick={() => {
          void exportData(category as string);
        }}
        className='relative -right-[92%] -top-8 h-8 w-8 rounded-full text-gray-600 transition duration-300 hover:bg-[#6AA6FF] hover:text-white'
      >
        <i className='bx bxs-download text-xl'></i>
      </button>
    </div>
  );
}
