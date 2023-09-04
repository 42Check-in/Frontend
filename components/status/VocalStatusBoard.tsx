import type { ApplicationFormInfo } from '@/interfaces/FormInfo';
import { cls } from '@/styles/cls';
import apiController from '@/utils/apiController';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ParsedUrlQueryInput } from 'querystring';
import { useEffect, useState } from 'react';
import type { Dispatch, ReactElement } from 'react';

import PresentationsStatus from './PresentationsStatus';
import Status from './Status';
import { btnContent } from './StatusBoard';

interface VocalStatusBoardProps {
  category: string;
  setCheckedList: Dispatch<React.SetStateAction<ApplicationFormInfo[]>>;
  checkedList: ApplicationFormInfo[];
  setChangePresentations: Dispatch<React.SetStateAction<{}>>;
  changePresentations: {};
}

export default function StatusBoard({
  category,
  setCheckedList,
  checkedList,
  setChangePresentations,
  changePresentations,
}: VocalStatusBoardProps): ReactElement {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [formInfos, setFormInfos] = useState<ApplicationFormInfo[]>();
  const [selectedFormInfo, setSelectedFormInfo] = useState<ApplicationFormInfo>();
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (category === undefined) return;
    const config = {
      url: `/vocal/subscriptions/${category}`,
    };
    async function fecthForms(): Promise<void> {
      const { data } = await apiController(config);
      setFormInfos(data);
    }
    void fecthForms();
  }, [category]);

  useEffect(() => {
    if (selectedFormInfo === undefined) return;
    const query: ParsedUrlQueryInput = { category };
    if (selectedFormInfo !== null) {
      query.formInfo = JSON.stringify(selectedFormInfo);
    }
    void router.push({ query });
  }, [selectedFormInfo]);

  if (formInfos === undefined) return;

  const btnBox = btnContent
    .filter((value) => value.category !== 'conference-rooms')
    .map((item) => {
      const handleCategoryClick = (): void => {
        void router.push({
          query: { category: item.category },
        });
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
    <div className='z-10 m-4 flex h-full max-h-[79vh] min-w-[405px] flex-col overflow-auto rounded-xl border bg-white dark:bg-slate-800 lg:w-[800px]'>
      <div className='sticky top-0 flex items-center justify-between space-x-4 border-b-2 bg-white p-4 dark:bg-slate-700'>
        <div className='flex w-full items-center space-x-2'>
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
              category !== 'presentations' ? '' : 'invisible',
              'mr-3 h-6 w-6 rounded border-gray-300 transition hover:ring-2 hover:ring-indigo-500 focus:ring-indigo-500',
            )}
          />
          <div className='flex space-x-3'>{btnBox}</div>
        </div>
        <div className='relative inline-block text-left'>
          <div>
            <button
              type='button'
              className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              id='menu-button'
              aria-expanded='true'
              aria-haspopup='true'
              onClick={() => setShowDropDown(!showDropDown)}
            >
              Options
              <svg
                className='-mr-1 h-5 w-5 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clip-rule='evenodd'
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
              <div className='py-1' role='none'>
                <Link
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  id='menu-item-0'
                >
                  미승인 항목
                </Link>
                <Link
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  id='menu-item-1'
                >
                  승인된 항목
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='mt-6 w-full'>
        {formInfos.map((item, i) => (
          <div
            key={item.formId}
            className='group mx-2 mb-4 flex h-14 items-center justify-center rounded-2xl border-2 shadow-xl transition duration-300 hover:bg-[#6AA6FF] dark:hover:bg-gray-700'
            onClick={() => {
              if (item === selectedFormInfo) {
                setSelectedFormInfo(null);
                return;
              }
              setSelectedFormInfo(item);
            }}
          >
            {category !== 'presentations' && (
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
                  item.status > 0 ? 'invisible' : '',
                  'mx-2 h-4 w-4 rounded border-gray-300 transition',
                )}
              />
            )}
            {category !== 'presentations' ? (
              <Status status={item} vocal />
            ) : (
              <>
                <PresentationsStatus
                  status={item}
                  changePresentations={changePresentations}
                  setChangePresentations={setChangePresentations}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
