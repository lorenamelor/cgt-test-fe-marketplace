import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id?: string;
  className?: string;
  wrapperClassName?: string;
};

export function Input({ label, id, className, wrapperClassName, ...rest }: InputProps) {
  const inputId = id ?? (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={cn(
          'h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary',
          className,
        )}
        {...rest}
      />
    </div>
  );
}
