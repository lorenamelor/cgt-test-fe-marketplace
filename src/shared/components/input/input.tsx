import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { InputError } from './error';
import { InputLabel } from './label';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id?: string;
  className?: string;
  wrapperClassName?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, className, wrapperClassName, error, required, ...rest },
  ref,
) {
  const inputId = id ?? (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;
  const hasError = Boolean(error && errorId);

  return (
    <div className={cn(wrapperClassName)}>
      <InputLabel htmlFor={inputId} text={label} required={required} />

      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-required={required ? true : undefined}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={cn(
          'h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary',
          hasError && 'border-red-300 focus:border-red-400 focus:ring-red-400',
          className,
        )}
        {...rest}
      />

      <InputError hasError={hasError} errorId={errorId} message={error} />
    </div>
  );
});
