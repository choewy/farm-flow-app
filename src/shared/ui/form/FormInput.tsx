import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldErrors, FieldPath, get, UseFormRegisterReturn } from 'react-hook-form';

export type FormInputProps<T extends object> = {
  labelText: string;
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  registerProps: UseFormRegisterReturn<FieldPath<T>>;
  errors: FieldErrors<T>;
};

export function FormInput<T extends object>({ labelText, inputProps, registerProps, errors }: FormInputProps<T>) {
  const error = get(errors, registerProps.name);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-bold text-slate-700 ml-1">{labelText}</label>
      <input
        {...inputProps}
        {...registerProps}
        className={`w-full py-3.5 px-4 bg-slate-50 border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
          error ? 'border-danger focus:border-danger' : 'border-slate-200 focus:border-primary'
        }`}
      />
      {error && <p className="text-xs font-bold text-danger animate-in slide-in-from-top-1 ml-1 mt-1">{error}</p>}
    </div>
  );
}
