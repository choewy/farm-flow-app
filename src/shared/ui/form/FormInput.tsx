import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldErrors, FieldPath, get, UseFormRegisterReturn } from 'react-hook-form';

export type FormInputProps<T extends object> = {
  labelText: string;
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  registerProps: UseFormRegisterReturn<FieldPath<T>>;
  errors: FieldErrors<T>;
};

export function FormInput<T extends object>({ labelText, errors, inputProps, registerProps }: FormInputProps<T>) {
  const error = get(errors, registerProps.name);

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{labelText}</label>
      <input
        className="block w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-inner"
        {...inputProps}
        {...registerProps}
      />
      {error && <p className="mt-1.5 ml-2 text-sm text-danger font-medium">{error.message}</p>}
    </div>
  );
}
