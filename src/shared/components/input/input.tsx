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
    <div className={cn('flex flex-col gap-1', wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={cn(
          'h-14 w-full rounded-2xl border border-transparent bg-slate-50 px-5 text-sm text-slate-700 placeholder-slate-400 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30',
          className,
        )}
        {...rest}
      />
    </div>
  );
}
