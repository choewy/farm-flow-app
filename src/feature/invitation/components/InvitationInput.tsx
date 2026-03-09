import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldErrors, FieldPath, get, UseFormRegisterReturn } from 'react-hook-form';

export type InvitationInputProps<T extends object> = {
  labelText: string;
  inputProps: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  registerProps: UseFormRegisterReturn<FieldPath<T>>;
  errors: FieldErrors<T>;
};

export function InvitationInput<T extends object>({ labelText, inputProps, registerProps, errors }: InvitationInputProps<T>) {
  const error = get(errors, registerProps.name);

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{labelText}</label>
      <div className="relative">
        <input
          className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-inner"
          {...inputProps}
          {...registerProps}
        />
      </div>
      {error && <p className="mt-2 ml-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
