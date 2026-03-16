import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldErrors, FieldPath, get, UseFormRegisterReturn } from 'react-hook-form';

export type BaseFormInputProps<T extends object> = {
  labelText: string;
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  registerProps: UseFormRegisterReturn<FieldPath<T>>;
  errors: FieldErrors<T>;
};

export type FormInputProps<T extends object> = BaseFormInputProps<T>;

export function FormInput<T extends object>({ labelText, inputProps, registerProps, errors }: FormInputProps<T>) {
  const error = get(errors, registerProps.name);

  return (
    <div className="app-input-wrap">
      <label className="app-input-label">{labelText}</label>
      <input {...inputProps} {...registerProps} className={`app-input ${error ? 'app-input-error' : ''}`} />
      {error && <p className="ml-1 mt-1 animate-in slide-in-from-top-1 text-xs font-bold text-danger">{String(error.message ?? '')}</p>}
    </div>
  );
}
