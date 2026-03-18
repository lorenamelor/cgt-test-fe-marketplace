import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type TagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Tag({ className, children, type = 'button', ...rest }: TagProps) {
  return (
    <button
      type={type}
      className={cn(
        'px-5 py-2 rounded-full text-sm font-medium transition-all bg-white border border-slate-200 hover:bg-primary hover:text-white hover:border-primary',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
