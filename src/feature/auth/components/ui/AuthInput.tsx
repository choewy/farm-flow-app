import { DetailedHTMLProps } from 'react';
import { FieldErrors, FieldPath, get, UseFormRegisterReturn } from 'react-hook-form';

export type AuthInputProps<T extends object> = {
  labelText: string;
  inputProps: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  registerProps: UseFormRegisterReturn<FieldPath<T>>;
  errors: FieldErrors<T>;
};

export function AuthInput<T extends object>({ labelText, errors, inputProps, registerProps }: AuthInputProps<T>) {
  const error = get(errors, registerProps.name);

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800 ml-1 mb-3">{labelText}</label>
      <input
        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 text-sm transition-shadow"
        {...inputProps}
        {...registerProps}
      />
      {error && <p className="mt-2 ml-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
