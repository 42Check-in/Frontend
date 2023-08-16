import type { ReactElement } from 'react';

interface FormSelectProps {
  title: string;
  contents: string[];
  disabled?: boolean;
  placeholder?: string;
}

export default function FormSelect({
  title,
  contents,
  disabled,
  placeholder,
}: FormSelectProps): ReactElement {
  return (
    <div className='sm:col-span-3'>
      <label htmlFor={title} className='block text-sm font-medium leading-6 text-gray-900'>
        {title}
      </label>
      <div className='mt-2'>
        <select
          id={title}
          name={title}
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
          disabled={disabled}
          placeholder={placeholder}
        >
          {contents.map((content) => (
            <option key={content}>{content}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
