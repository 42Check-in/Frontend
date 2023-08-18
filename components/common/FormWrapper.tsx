import type { Dispatch, FormEvent, ReactElement, ReactNode, SetStateAction } from 'react';

import FormSubmitButton from '../common/FormSubmitButton';

interface FormWrapperProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function FormWrapper({ setShowModal, children }: FormWrapperProps): ReactElement {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setShowModal(true);
  };
  return (
    <form action='#' method='POST' onSubmit={handleFormSubmit} className='mx-auto my-10 max-w-xl'>
      {children}
      <FormSubmitButton />
    </form>
  );
}
