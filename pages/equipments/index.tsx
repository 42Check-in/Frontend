import Calendar from '@/components/calendar/Calendar';
import ModalText from '@/components/common/ModalText';
import ModalWrapper from '@/components/common/ModalWrapper';
import { useState } from 'react';
import type { ReactElement } from 'react';

export default function Equipments(): ReactElement {
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      {showModal && (
        <ModalWrapper>
          <ModalText>신청 유형을 선택해 주세요.</ModalText>
          <div className='space-x-2'>
            <button className='button-modal'>
              <p>신규</p>
            </button>
            <button className='button-modal'>
              <p>연장</p>
            </button>
          </div>
        </ModalWrapper>
      )}
      <Calendar />
    </>
  );
}
