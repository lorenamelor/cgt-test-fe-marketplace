import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={cn('rounded-3xl bg-white p-6 shadow-[0_22px_45px_rgba(15,23,42,0.08)]', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
