import type { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { get } from 'react-hook-form';

import type { BaseFormInputProps } from './FormInput';

import { Formatter } from '@app/shared/helpers';

const countDigits = (value: string) => value.replace(/[^\d]/g, '').length;

const getCaretPositionFromDigitIndex = (value: string, digitIndex: number) => {
  if (digitIndex <= 0) {
    return 0;
  }

  let digitsSeen = 0;

  for (let index = 0; index < value.length; index += 1) {
    if (/\d/.test(value[index])) {
      digitsSeen += 1;
    }

    if (digitsSeen >= digitIndex) {
      return index + 1;
    }
  }

  return value.length;
};

export type FormMoneyInputProps<T extends object> = BaseFormInputProps<T> & {
  suffixText?: string;
  wrapperClassName?: string;
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

export function FormMoneyInput<T extends object>({
  labelText,
  inputProps,
  registerProps,
  errors,
  suffixText = '원',
  wrapperClassName,
}: FormMoneyInputProps<T>) {
  const error = get(errors, registerProps.name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { selectionStart, value } = event.target;
    const formattedValue = Formatter.toMoney(value);
    const digitIndex = countDigits(value.slice(0, selectionStart ?? formattedValue.length));

    event.target.value = formattedValue;
    registerProps.onChange(event);
    inputProps?.onChange?.(event);

    requestAnimationFrame(() => {
      const nextCaretPosition = getCaretPositionFromDigitIndex(formattedValue, digitIndex);
      event.target.setSelectionRange(nextCaretPosition, nextCaretPosition);
    });
  };

  return (
    <div className={`app-input-wrap ${wrapperClassName ?? ''}`.trim()}>
      <label className="app-input-label">{labelText}</label>
      <div
        className={`flex items-center rounded-[1.25rem] border bg-[rgba(255,255,255,0.96)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_18px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow,transform] duration-150 focus-within:border-[rgba(56,189,248,0.34)] focus-within:shadow-[0_0_0_4px_rgba(56,189,248,0.12),0_12px_26px_rgba(56,189,248,0.08)] ${
          error
            ? 'border-[rgba(208,84,84,0.45)] shadow-[0_0_0_4px_rgba(208,84,84,0.1),0_12px_24px_rgba(208,84,84,0.06)]'
            : 'border-[rgba(148,163,184,0.22)]'
        }`}
      >
        <input
          {...inputProps}
          {...registerProps}
          onChange={handleChange}
          type="text"
          inputMode="numeric"
          className="min-w-0 flex-1 rounded-l-[1.25rem] border-0 bg-transparent pl-4 pr-1 py-[0.95rem] text-right text-[0.92rem] text-(--app-text) outline-none placeholder:text-[rgba(91,114,133,0.58)]"
        />
        <span className="shrink-0 pr-4 text-sm font-semibold text-slate-400">{suffixText}</span>
      </div>
      {error && <p className="ml-1 mt-1 animate-in slide-in-from-top-1 text-xs font-bold text-danger">{String(error.message ?? '')}</p>}
    </div>
  );
}
