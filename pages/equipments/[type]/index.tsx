import Calendar from '@/components/calendar/Calendar';
import ModalText from '@/components/common/ModalText';
import ModalWrapper from '@/components/common/ModalWrapper';
import type EquipmentsFormInfo from '@/interfaces/EquipmentsFormInfo';
import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

export default function EquipmentsType(): ReactElement {
  const router = useRouter();
  const [formInfos, setFormInfos] = useState<EquipmentsFormInfo[]>([]);
  const [type, setType] = useState<string | string[]>();

  useEffect(() => {
    setType(router.query.type);
  }, [router]);

  useEffect(() => {
    if (type !== 'extension') return;
    async function fetchData(): Promise<void> {
      const config = {
        url: '/equipments/form/extension',
      };
      const { data } = await apiController(config);
      setFormInfos(data);
    }
    void fetchData();
  }, [type]);

  return (
    <>
      {type === 'extension' && (
        <ModalWrapper>
          <ModalText>연장할 장비를 선택해 주세요.</ModalText>
          <div className='flex-col justify-center space-y-2'>
            {formInfos.map(({ formId, equipment, returnDate }) => (
              <div key={formId}>
                <p>{equipment}</p>
                <p>{returnDate}</p>
              </div>
            ))}
          </div>
        </ModalWrapper>
      )}
      <Calendar />
    </>
  );
}
