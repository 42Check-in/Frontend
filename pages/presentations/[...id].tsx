import ModalButton from '@/components/common/ModalButton';
import ModalText from '@/components/common/ModalText';
import ModalWrapper from '@/components/common/ModalWrapper';
import PresentationsForm from '@/components/form/PresentationsForm';
import { useState } from 'react';
import type { ReactElement } from 'react';

export default function PresentationApplication(): ReactElement {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <PresentationsForm setShowModal={setShowModal} />
      {showModal && (
        <ModalWrapper>
          <ModalText>
            <p>신청이 완료되었습니다.</p>
            <p>Vocal분의 승인을 기다려 주세요 :)</p>
          </ModalText>
          <ModalButton text='오예~~!!' />
        </ModalWrapper>
      )}
    </div>
  );
}
