import type { ChangeEventHandler, ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormInputProps {
  title: string;
  type: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  span?: string;
  value?: string;
}

export default function FormInput({
  title,
  type,
  disabled,
  onChange,
  placeholder,
  span = 'full',
  value,
}: FormInputProps): ReactElement {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={`col-span-${span}`}>
      <label htmlFor={title} className='block text-sm font-medium leading-6 text-gray-900'>
        {title}
      </label>
      <div className='mt-2'>
        <input
          type={type}
          id={title}
          className='block w-full rounded-md border-0 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          {...register(title, { required: true })}
        />
      </div>
    </div>
  );
}
