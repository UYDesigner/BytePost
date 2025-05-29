import React, { useId } from 'react';

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", placeholder = "enter", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="font-medium text-gray-700 inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={` border-1 border-gray-200 w-full rounded=lg  px-3 py-2 outline-none focus:border-gray-300 focus:bg-gray-100 duration-200 bg-white text-black ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
