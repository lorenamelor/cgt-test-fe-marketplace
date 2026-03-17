import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export function Button({
  variant = 'primary',
  children,
  className,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex h-14 w-full items-center justify-center rounded-xl px-6 text-[0.9375rem] font-semibold tracking-tight transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
        {
          'bg-primary text-white hover:opacity-90 active:scale-[0.97]': variant === 'primary',
          'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100':
            variant === 'secondary',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
