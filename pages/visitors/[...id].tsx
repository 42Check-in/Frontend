import VisitorsForm from '@/components/form/EquipmentsForm';
import OkModal from '@/components/modal/OkModal';
import { useState } from 'react';
import type { ReactElement } from 'react';

export default function Equipments(): ReactElement {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <VisitorsForm setShowModal={setShowModal} />
      {showModal && <OkModal />}
    </>
  );
}
