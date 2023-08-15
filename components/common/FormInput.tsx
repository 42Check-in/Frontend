import type { ChangeEventHandler, ReactElement } from 'react';

interface FormInputProps {
  title: string;
  type: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
}

export default function FormInput({
  title,
  type,
  disabled,
  onChange,
  placeholder,
  value,
}: FormInputProps): ReactElement {
  return (
    <div>
      <label htmlFor={title} className='block text-sm font-semibold leading-6 text-gray-900'>
        {title}
      </label>
      <div className='mt-2.5'>
        <input
          type={type}
          name={title}
          id={title}
          className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
}
