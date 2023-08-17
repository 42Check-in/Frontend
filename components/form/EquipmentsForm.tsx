import type { ReactElement } from 'react';

import FormAgreement from '../common/FormAgreement';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormSubmitButton from '../common/FormSubmitButton';
import FormTextArea from '../common/FormTextArea';
import FormWrapper from '../common/FormWrapper';

const EQUIPMENTS = ['맥북', '삼성 노트북', '아이패드'];
const PERIODS = ['1개월', '3개월'];
const PURPOSES = ['42 과제'];

export default function EquimentsForm(): ReactElement {
  return (
    <FormWrapper>
      <div className='mx-auto max-w-2xl pb-5 text-gray-900'>
        <h2 className='border-b border-[#6A70FF] pb-3 text-3xl font-bold tracking-tight text-[#6A70FF]'>
          기자재 대여 신청
        </h2>
      </div>
      <form action='#' method='POST' className='mx-auto my-10 max-w-xl'>
        <div className='grid grid-cols-2 gap-x-8 gap-y-6 pb-6'>
          <FormInput
            title='신청자 이름'
            type='text'
            onChange={() => {}}
            placeholder='실명을 알려 주세요. (예시: 정우성)'
          />
          <FormInput
            title='연락처'
            type='text'
            onChange={() => {}}
            placeholder='연락처를 입력해 주세요. (예시: 010-4242-4242)'
          />
          <FormSelect title='대여 물품' contents={EQUIPMENTS} span='1' />
          <FormSelect title='대여 목적' contents={PURPOSES} span='1' />
          <FormTextArea
            title='활용 계획 (무엇을, 어떻게, 왜, 언제까지 4가지를 꼭 기재해 주세요.)'
            onChange={() => {}}
            placeholder='상세히 기술해 주세요.'
          />
          <FormTextArea title='기대 효과' onChange={() => {}} />
          <FormSelect title='대여 기간' contents={PERIODS} span='1' />
          <FormInput title='반납 예정일' type='date' onChange={() => {}} span='1' />
          <FormAgreement>
            대여한 물품을 파손시킬 경우 비용이 청구될 수 있음을 확인했습니다.
          </FormAgreement>
        </div>
        <FormSubmitButton />
      </form>
    </FormWrapper>
  );
}